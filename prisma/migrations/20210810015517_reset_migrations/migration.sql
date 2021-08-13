-- CreateTable
CREATE TABLE `ActivityEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `timestamp` DATETIME(0) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255),
    `body` LONGTEXT,
    `reactions` JSON,
    `profile_id` VARCHAR(36),
    `parentId` VARCHAR(36),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `author_id` VARCHAR(36) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `reactions` JSON,
    `project_id` VARCHAR(36),
    `parentId` VARCHAR(36),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardAnalyticsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `analyticsInfo` JSON NOT NULL,
    `languagesData` JSON NOT NULL,
    `mobileDesktopChartData` JSON NOT NULL,
    `sourceMediumChartData` JSON NOT NULL,
    `sourceMediumTableData` JSON NOT NULL,
    `trafficTableData` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `dashboardData` JSON NOT NULL,
    `salesRevenueChartData` JSON NOT NULL,
    `weeklySalesChartData` JSON NOT NULL,
    `weeklySalesTableData` JSON NOT NULL,
    `appointmentsData` JSON NOT NULL,
    `latestProjectsTableData` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255),
    `following` BOOLEAN,
    `location` VARCHAR(255),
    `from` VARCHAR(255),

    UNIQUE INDEX `ProfileEntity.username_unique`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileSkillsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `profileId` VARCHAR(36) NOT NULL,
    `skillsId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `ProjectsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `title` VARCHAR(255) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `badge` JSON,
    `actions` JSON,
    `progress` INTEGER,
    `rollupData` JSON,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectSummaryEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `endDate` DATETIME(6),
    `startDate` DATETIME(6),
    `project_id` VARCHAR(36) NOT NULL,
    `reporting_user_id` VARCHAR(36) NOT NULL,
    `budget` INTEGER,
    `logged` VARCHAR(255),
    `estimated` VARCHAR(255),

    UNIQUE INDEX `ProjectSummaryEntity.project_id_unique`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectsAssigneeEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `projectsId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `role` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `RolesEntity.role_unique`(`role`),
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
    `passwordResetNeeded` BOOLEAN,
    `lastPasswordUpdateDate` DATETIME(0),
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailVerifyToken` VARCHAR(255),
    `phone` VARCHAR(255),
    `phoneVerifyToken` VARCHAR(255),
    `suspended` BOOLEAN NOT NULL DEFAULT false,
    `lastLogin` DATETIME(0),
    `deletedDate` DATETIME(6),
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserEntity.username_unique`(`username`),
    UNIQUE INDEX `UserEntity.emailVerifyToken_unique`(`emailVerifyToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEventsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `event` VARCHAR(255) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `target_user_id` VARCHAR(36),
    `acting_user_id` VARCHAR(36),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRolesEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `role_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTagsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `user_id` VARCHAR(36) NOT NULL,
    `tag_id` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagsEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `type` VARCHAR(255) NOT NULL,
    `src` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(255) NOT NULL,
    `profile_id` VARCHAR(36),
    `project_id` VARCHAR(36),
    `user_id` VARCHAR(36),

    UNIQUE INDEX `src_alt_unique_constraint`(`src`, `alt`),
    UNIQUE INDEX `profile_alt_unique_constraint`(`profile_id`, `alt`),
    UNIQUE INDEX `project_alt_unique_constraint`(`project_id`, `alt`),
    UNIQUE INDEX `MediaAsset_profile_id_unique`(`profile_id`),
    UNIQUE INDEX `MediaAsset_project_id_unique`(`project_id`),
    UNIQUE INDEX `MediaAsset_user_id_unique`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD FOREIGN KEY (`parentId`) REFERENCES `ActivityEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`author_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`parentId`) REFERENCES `CommentEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEntity` ADD FOREIGN KEY (`username`) REFERENCES `UserEntity`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD FOREIGN KEY (`skillsId`) REFERENCES `SkillsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD FOREIGN KEY (`reporting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD FOREIGN KEY (`projectsId`) REFERENCES `ProjectsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD FOREIGN KEY (`target_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD FOREIGN KEY (`acting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`role_id`) REFERENCES `RolesEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD FOREIGN KEY (`tag_id`) REFERENCES `TagsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
