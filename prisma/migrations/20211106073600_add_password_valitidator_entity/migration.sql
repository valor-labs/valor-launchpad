-- CreateTable
CREATE TABLE `PasswordValidationEntity` (
    `id` VARCHAR(36) NOT NULL,
    `passwordValidation` JSON NULL,
    `user_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `PasswordValidationEntity_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordValidationEntity` ADD CONSTRAINT `PasswordValidationEntity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
