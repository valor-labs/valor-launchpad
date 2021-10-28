/*
  Warnings:

  - You are about to drop the column `user_id` on the `MediaAsset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MediaAsset` DROP FOREIGN KEY `MediaAsset_user_id_fkey`;

-- AlterTable
ALTER TABLE `MediaAsset` DROP COLUMN `user_id`;
