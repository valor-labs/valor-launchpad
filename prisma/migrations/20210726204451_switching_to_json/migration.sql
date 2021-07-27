/*
  Warnings:

  - Made the column `user_id` on table `UserRolesEntity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `UserRolesEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `UserRolesEntity` DROP FOREIGN KEY `UserRolesEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `UserRolesEntity` DROP FOREIGN KEY `UserRolesEntity_ibfk_1`;

-- AlterTable
ALTER TABLE `UserRolesEntity` MODIFY `user_id` VARCHAR(36) NOT NULL,
    MODIFY `role_id` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`role_id`) REFERENCES `RolesEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
