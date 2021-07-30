/*
  Warnings:

  - You are about to drop the column `event` on the `ProjectSummaryEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProjectSummaryEntity` DROP COLUMN `event`,
    ADD COLUMN `budget` INTEGER,
    ADD COLUMN `estimated` VARCHAR(255),
    ADD COLUMN `logged` VARCHAR(255);
