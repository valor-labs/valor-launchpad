/*
  Warnings:

  - You are about to drop the column `actions` on the `ProjectsEntity` table. All the data in the column will be lost.
  - You are about to drop the column `badge` on the `ProjectsEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProjectsEntity` DROP COLUMN `actions`,
    DROP COLUMN `badge`,
    ADD COLUMN `cloneable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `deletable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `status` ENUM('IN_PROGRESS', 'FINISHED', 'ON_HOLD');
