/*
  Warnings:

  - Added the required column `tag_id` to the `UserTagsEntity` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `UserTagsEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `UserTagsEntity` DROP FOREIGN KEY `UserTagsEntity_ibfk_1`;

-- AlterTable
ALTER TABLE `UserTagsEntity` ADD COLUMN `tag_id` VARCHAR(36) NOT NULL,
    MODIFY `user_id` VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `TagsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD FOREIGN KEY (`tag_id`) REFERENCES `TagsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
