-- CreateTable
CREATE TABLE `ClientsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `avatar` VARCHAR(36) NOT NULL,
    `name` VARCHAR(36) NOT NULL,
    `company` VARCHAR(36) NOT NULL,
    `email` VARCHAR(36) NOT NULL,
    `phone` VARCHAR(36) NOT NULL,
    `status` VARCHAR(36) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Timeline` (
    `id` VARCHAR(36) NOT NULL,
    `timelineId` VARCHAR(36) NOT NULL,
    `title` VARCHAR(36) NOT NULL,
    `time` DATETIME(6) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientsEntity` ADD CONSTRAINT `ClientsEntity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timeline` ADD CONSTRAINT `Timeline_timelineId_fkey` FOREIGN KEY (`timelineId`) REFERENCES `ClientsEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
