-- CreateTable
CREATE TABLE `TaskEntity` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `taskIndex` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(1023) NOT NULL,
    `taskStatus` ENUM('UPCOMING', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(6) NULL,
    `deletedDate` DATETIME(6) NULL,
    `createdBy` VARCHAR(36) NULL,
    `deletedBy` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskEntity` ADD CONSTRAINT `TaskEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskEntity` ADD CONSTRAINT `TaskEntity_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskEntity` ADD CONSTRAINT `TaskEntity_deletedBy_fkey` FOREIGN KEY (`deletedBy`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
