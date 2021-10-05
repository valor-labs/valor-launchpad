/*
  Warnings:

  - You are about to drop the column `following` on the `ProfileEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `SkillsEntity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SkillsEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialMediaUrl` to the `SocialMediaMatchingEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProfileEntity` DROP COLUMN `following`;

-- AlterTable
ALTER TABLE `SkillsEntity` ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `SocialMediaMatchingEntity` ADD COLUMN `socialMediaUrl` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SkillsEntity.name_unique` ON `SkillsEntity`(`name`);
