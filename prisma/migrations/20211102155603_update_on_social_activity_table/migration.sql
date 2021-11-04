/*
  Warnings:

  - You are about to drop the column `operatorAvatarSrc` on the `SocialActivity` table. All the data in the column will be lost.
  - You are about to drop the column `operatorFullName` on the `SocialActivity` table. All the data in the column will be lost.
  - You are about to drop the column `targetUserAvatarSrc` on the `SocialActivity` table. All the data in the column will be lost.
  - You are about to drop the column `targetUserFullName` on the `SocialActivity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SocialActivity` DROP COLUMN `operatorAvatarSrc`,
    DROP COLUMN `operatorFullName`,
    DROP COLUMN `targetUserAvatarSrc`,
    DROP COLUMN `targetUserFullName`;
