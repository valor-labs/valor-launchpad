/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `RolesEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UserEntity` MODIFY `emailVerified` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `RolesEntity.role_unique` ON `RolesEntity`(`role`);
