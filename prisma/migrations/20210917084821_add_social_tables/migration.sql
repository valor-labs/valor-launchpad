/*
  Warnings:

  - A unique constraint covering the columns `[story_id,alt]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `CommentEntity` ADD COLUMN `storyId` VARCHAR(36);

-- AlterTable
ALTER TABLE `MediaAsset` ADD COLUMN `story_id` VARCHAR(36);

-- CreateTable
CREATE TABLE `SocialUserFollower` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `followerId` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),

    UNIQUE INDEX `SocialUserFollower.userId_followerId_unique`(`userId`, `followerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialStory` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialStoryUserLike` (
    `id` VARCHAR(36) NOT NULL,
    `storyId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),

    UNIQUE INDEX `SocialStoryUserLike.storyId_userId_unique`(`storyId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operatorId` VARCHAR(36) NOT NULL,
    `operatorFullName` VARCHAR(255) NOT NULL,
    `operatorAvatarSrc` VARCHAR(255) NOT NULL,
    `action` ENUM('FOLLOWED', 'UNFOLLOWED', 'POST_STORY', 'LIKED_STORY', 'UNLIKED_STORY') NOT NULL,
    `targetUserId` VARCHAR(36),
    `targetUserFullName` VARCHAR(255),
    `targetUserAvatarSrc` VARCHAR(255),
    `storyId` VARCHAR(36),
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `story_alt_unique_constraint` ON `MediaAsset`(`story_id`, `alt`);

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`story_id`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialUserFollower` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialUserFollower` ADD FOREIGN KEY (`followerId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStory` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStoryUserLike` ADD FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStoryUserLike` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialActivity` ADD FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
