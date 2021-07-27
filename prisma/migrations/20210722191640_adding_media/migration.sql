/*
  Warnings:

  - You are about to drop the column `assignee` on the `ProjectsEntity` table. All the data in the column will be lost.
  - You are about to drop the column `hero` on the `ProjectsEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProjectsEntity` DROP COLUMN `assignee`,
    DROP COLUMN `hero`;

-- CreateTable
CREATE TABLE `ProjectsAssigneeEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `projectsId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `type` VARCHAR(255) NOT NULL,
    `src` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(255) NOT NULL,
    `project_id` VARCHAR(36),

    UNIQUE INDEX `MediaAsset_project_id_unique`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD FOREIGN KEY (`projectsId`) REFERENCES `ProjectsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
