/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetToken]` on the table `UserEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UserEntity` ADD COLUMN `passwordResetToken` VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX `UserEntity.passwordResetToken_unique` ON `UserEntity`(`passwordResetToken`);
