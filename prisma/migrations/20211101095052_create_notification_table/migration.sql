-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(36) NOT NULL,
    `type` ENUM('COMMENT', 'REPLY_COMMENT', 'LIKE_COMMENT') NOT NULL,
    `extras` JSON NULL,
    `read` BOOLEAN NOT NULL,
    `readDate` DATETIME(6) NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
