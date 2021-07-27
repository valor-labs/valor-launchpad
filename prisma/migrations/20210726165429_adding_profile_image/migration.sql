/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `MediaAsset` ADD COLUMN `user_id` VARCHAR(36);

-- CreateIndex
CREATE UNIQUE INDEX `MediaAsset_user_id_unique` ON `MediaAsset`(`user_id`);

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
