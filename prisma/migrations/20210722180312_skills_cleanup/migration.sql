/*
  Warnings:

  - You are about to drop the column `skills` on the `ProfileEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProfileEntity` DROP COLUMN `skills`;

-- CreateTable
CREATE TABLE `ProfileSkillsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `profileId` VARCHAR(36) NOT NULL,
    `skillsId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD FOREIGN KEY (`skillsId`) REFERENCES `SkillsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
