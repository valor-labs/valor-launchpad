/*
  Warnings:

  - You are about to drop the column `role` on the `UserRolesEntity` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `UserTagsEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `ProfileEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ProfileEntity` MODIFY `avatar` VARCHAR(255),
    MODIFY `title` VARCHAR(255),
    MODIFY `following` BOOLEAN,
    MODIFY `location` VARCHAR(255),
    MODIFY `from` VARCHAR(255),
    MODIFY `employer` LONGTEXT,
    MODIFY `social_media` LONGTEXT,
    MODIFY `skills` LONGTEXT;

-- AlterTable
ALTER TABLE `UserEntity` MODIFY `suspended` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserRolesEntity` DROP COLUMN `role`,
    ADD COLUMN `role_id` VARCHAR(36);

-- AlterTable
ALTER TABLE `UserTagsEntity` DROP COLUMN `tag`;

-- CreateIndex
CREATE UNIQUE INDEX `ProfileEntity.username_unique` ON `ProfileEntity`(`username`);

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`role_id`) REFERENCES `RolesEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
