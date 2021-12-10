-- CreateTable
CREATE TABLE `TermsOfUseAcceptance` (
    `id` VARCHAR(36) NOT NULL,
    `termsOfUseId` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6) NULL,
    `userId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TermsOfUse` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `createdUserId` VARCHAR(36) NOT NULL,
    `deletedDate` DATETIME(6) NULL,
    `deletedUserId` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TermsOfUseAcceptance` ADD CONSTRAINT `TermsOfUseAcceptance_termsOfUseId_fkey` FOREIGN KEY (`termsOfUseId`) REFERENCES `TermsOfUse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TermsOfUseAcceptance` ADD CONSTRAINT `TermsOfUseAcceptance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TermsOfUse` ADD CONSTRAINT `TermsOfUse_createdUserId_fkey` FOREIGN KEY (`createdUserId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TermsOfUse` ADD CONSTRAINT `TermsOfUse_deletedUserId_fkey` FOREIGN KEY (`deletedUserId`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
