-- CreateTable
CREATE TABLE `ActivityEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `timestamp` DATETIME(0) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255),
    `body` LONGTEXT,
    `reactions` LONGTEXT,
    `nsleft` INTEGER NOT NULL DEFAULT 1,
    `nsright` INTEGER NOT NULL DEFAULT 2,
    `profile_id` VARCHAR(36),
    `parentId` VARCHAR(36),

    INDEX `FK_12b3ddef189fddd522d368f2634`(`profile_id`),
    INDEX `FK_3fa920cacc4a89e4e42c63bf24e`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `author` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `reactions` LONGTEXT,
    `nsleft` INTEGER NOT NULL DEFAULT 1,
    `nsright` INTEGER NOT NULL DEFAULT 2,
    `project_id` VARCHAR(36),
    `parentId` VARCHAR(36),

    INDEX `FK_94d540d1210eb47d8c42048365e`(`parentId`),
    INDEX `FK_be1e5eb5b0ea536686aac8ab28c`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardAnalyticsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `analyticsInfo` LONGTEXT NOT NULL,
    `languagesData` LONGTEXT NOT NULL,
    `mobileDesktopChartData` LONGTEXT NOT NULL,
    `sourceMediumChartData` LONGTEXT NOT NULL,
    `sourceMediumTableData` LONGTEXT NOT NULL,
    `trafficTableData` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardEntity` (
    `id` VARCHAR(36) NOT NULL,
    `dashboardData` LONGTEXT NOT NULL,
    `salesRevenueChartData` LONGTEXT NOT NULL,
    `weeklySalesChartData` LONGTEXT NOT NULL,
    `weeklySalesTableData` LONGTEXT NOT NULL,
    `appointmentsData` LONGTEXT NOT NULL,
    `latestProjectsTableData` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `following` TINYINT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `from` VARCHAR(255) NOT NULL,
    `employer` LONGTEXT NOT NULL,
    `social_media` LONGTEXT NOT NULL,
    `skills` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `title` VARCHAR(255) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `badge` LONGTEXT,
    `hero` LONGTEXT,
    `actions` LONGTEXT,
    `progress` INTEGER,
    `assignee` LONGTEXT,
    `summary` LONGTEXT,
    `rollupData` LONGTEXT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesEntity` (
    `id` VARCHAR(36) NOT NULL,
    `role` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEntity` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `passwordResetNeeded` TINYINT,
    `lastPasswordUpdateDate` DATETIME(0),
    `emailVerified` BOOLEAN NOT NULL,
    `emailVerifyToken` VARCHAR(255),
    `phone` VARCHAR(255),
    `phoneVerifyToken` VARCHAR(255),
    `suspended` TINYINT NOT NULL DEFAULT 0,
    `lastLogin` DATETIME(0),
    `createDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),
    `updateDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `UserEntity.username_unique`(`username`),
    UNIQUE INDEX `UserEntity.emailVerifyToken_unique`(`emailVerifyToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEventsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `event` VARCHAR(255) NOT NULL,
    `createDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6),
    `target_user_id` VARCHAR(36),
    `acting_user_id` VARCHAR(36),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRolesEntity` (
    `id` VARCHAR(36) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `deletedDate` DATETIME(6),
    `user_id` VARCHAR(36),

    INDEX `FK_2e17f8a7a60f0122b61bf8ab283`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTagsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `deletedDate` DATETIME(6),
    `tag` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(36),

    INDEX `FK_e560e835b7aa67a20e475e383f7`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD FOREIGN KEY (`parentId`) REFERENCES `ActivityEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`parentId`) REFERENCES `CommentEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD FOREIGN KEY (`target_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD FOREIGN KEY (`acting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
