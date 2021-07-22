/*
  Warnings:

  - You are about to drop the column `nsleft` on the `ActivityEntity` table. All the data in the column will be lost.
  - You are about to drop the column `nsright` on the `ActivityEntity` table. All the data in the column will be lost.
  - You are about to alter the column `updatedDate` on the `ActivityEntity` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to drop the column `nsleft` on the `CommentEntity` table. All the data in the column will be lost.
  - You are about to drop the column `nsright` on the `CommentEntity` table. All the data in the column will be lost.
  - You are about to alter the column `updatedDate` on the `CommentEntity` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to drop the column `employer` on the `ProfileEntity` table. All the data in the column will be lost.
  - You are about to drop the column `social_media` on the `ProfileEntity` table. All the data in the column will be lost.
  - You are about to alter the column `updatedDate` on the `ProfileEntity` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `updatedDate` on the `ProjectsEntity` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to drop the column `createDate` on the `UserEntity` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `UserEntity` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `UserEventsEntity` table. All the data in the column will be lost.
  - Added the required column `updatedDate` to the `DashboardAnalyticsEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `DashboardEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `RolesEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `UserEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `UserEventsEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `UserRolesEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `UserTagsEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActivityEntity` DROP COLUMN `nsleft`,
    DROP COLUMN `nsright`,
    ADD COLUMN `deletedDate` DATETIME(6),
    MODIFY `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `CommentEntity` DROP COLUMN `nsleft`,
    DROP COLUMN `nsright`,
    ADD COLUMN `deletedDate` DATETIME(6),
    MODIFY `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `DashboardAnalyticsEntity` ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `deletedDate` DATETIME(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `DashboardEntity` ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `deletedDate` DATETIME(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ProfileEntity` DROP COLUMN `employer`,
    DROP COLUMN `social_media`,
    ADD COLUMN `deletedDate` DATETIME(6),
    MODIFY `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ProjectsEntity` ADD COLUMN `deletedDate` DATETIME(6),
    MODIFY `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `RolesEntity` ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `deletedDate` DATETIME(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserEntity` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`,
    ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserEventsEntity` DROP COLUMN `createDate`,
    ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserRolesEntity` ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserTagsEntity` ADD COLUMN `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `SocialMediaEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `icon` VARCHAR(255) NOT NULL,
    `baseUrl` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMediaMatchingEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `profileId` VARCHAR(36),
    `socialMediaId` VARCHAR(36) NOT NULL,
    `employerId` VARCHAR(36),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployerEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `name` VARCHAR(255),
    `url` VARCHAR(255),
    `avatar` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileEmployerEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `current` BOOLEAN,
    `employerId` VARCHAR(36) NOT NULL,
    `profileId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD FOREIGN KEY (`socialMediaId`) REFERENCES `SocialMediaEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD FOREIGN KEY (`employerId`) REFERENCES `EmployerEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEmployerEntity` ADD FOREIGN KEY (`employerId`) REFERENCES `EmployerEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEmployerEntity` ADD FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
