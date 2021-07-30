/*
  Warnings:

  - You are about to drop the column `avatar` on the `ProfileEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `MediaAsset` ADD COLUMN `profile_id` VARCHAR(36);

-- AlterTable
ALTER TABLE `ProfileEntity` DROP COLUMN `avatar`;

-- CreateIndex
CREATE UNIQUE INDEX `MediaAsset_profile_id_unique` ON `MediaAsset`(`profile_id`);

-- AddForeignKey
ALTER TABLE `ProfileEntity` ADD FOREIGN KEY (`username`) REFERENCES `UserEntity`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
