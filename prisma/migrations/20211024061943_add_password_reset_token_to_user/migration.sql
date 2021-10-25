-- DropForeignKey
ALTER TABLE `ActivityEntity` DROP FOREIGN KEY `ActivityEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ActivityEntity` DROP FOREIGN KEY `ActivityEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `AnalyticByCity` DROP FOREIGN KEY `AnalyticByCity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `AnalyticByLanguage` DROP FOREIGN KEY `AnalyticByLanguage_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CommentEntity` DROP FOREIGN KEY `CommentEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CommentEntity` DROP FOREIGN KEY `CommentEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `CommentEntity` DROP FOREIGN KEY `CommentEntity_ibfk_3`;

-- DropForeignKey
ALTER TABLE `CommentEntity` DROP FOREIGN KEY `CommentEntity_ibfk_4`;

-- DropForeignKey
ALTER TABLE `MediaAsset` DROP FOREIGN KEY `MediaAsset_ibfk_1`;

-- DropForeignKey
ALTER TABLE `MediaAsset` DROP FOREIGN KEY `MediaAsset_ibfk_2`;

-- DropForeignKey
ALTER TABLE `MediaAsset` DROP FOREIGN KEY `MediaAsset_ibfk_4`;

-- DropForeignKey
ALTER TABLE `MediaAsset` DROP FOREIGN KEY `MediaAsset_ibfk_3`;

-- DropForeignKey
ALTER TABLE `MenusEntity` DROP FOREIGN KEY `MenusEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProfileEmployerEntity` DROP FOREIGN KEY `ProfileEmployerEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProfileEmployerEntity` DROP FOREIGN KEY `ProfileEmployerEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ProfileEntity` DROP FOREIGN KEY `ProfileEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProfileSkillsEntity` DROP FOREIGN KEY `ProfileSkillsEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProfileSkillsEntity` DROP FOREIGN KEY `ProfileSkillsEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ProjectSummaryEntity` DROP FOREIGN KEY `ProjectSummaryEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProjectSummaryEntity` DROP FOREIGN KEY `ProjectSummaryEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ProjectsAssigneeEntity` DROP FOREIGN KEY `ProjectsAssigneeEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ProjectsAssigneeEntity` DROP FOREIGN KEY `ProjectsAssigneeEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `RoleMenusEntity` DROP FOREIGN KEY `RoleMenusEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `RoleMenusEntity` DROP FOREIGN KEY `RoleMenusEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SocialActivity` DROP FOREIGN KEY `SocialActivity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `SocialActivity` DROP FOREIGN KEY `SocialActivity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SocialActivity` DROP FOREIGN KEY `SocialActivity_ibfk_3`;

-- DropForeignKey
ALTER TABLE `SocialMediaMatchingEntity` DROP FOREIGN KEY `SocialMediaMatchingEntity_ibfk_3`;

-- DropForeignKey
ALTER TABLE `SocialMediaMatchingEntity` DROP FOREIGN KEY `SocialMediaMatchingEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SocialMediaMatchingEntity` DROP FOREIGN KEY `SocialMediaMatchingEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `SocialStory` DROP FOREIGN KEY `SocialStory_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SocialStoryUserLike` DROP FOREIGN KEY `SocialStoryUserLike_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SocialStoryUserLike` DROP FOREIGN KEY `SocialStoryUserLike_ibfk_2`;

-- DropForeignKey
ALTER TABLE `SocialUserFollower` DROP FOREIGN KEY `SocialUserFollower_ibfk_2`;

-- DropForeignKey
ALTER TABLE `SocialUserFollower` DROP FOREIGN KEY `SocialUserFollower_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserEventsEntity` DROP FOREIGN KEY `UserEventsEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `UserEventsEntity` DROP FOREIGN KEY `UserEventsEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserRolesEntity` DROP FOREIGN KEY `UserRolesEntity_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserRolesEntity` DROP FOREIGN KEY `UserRolesEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `UserTagsEntity` DROP FOREIGN KEY `UserTagsEntity_ibfk_2`;

-- DropForeignKey
ALTER TABLE `UserTagsEntity` DROP FOREIGN KEY `UserTagsEntity_ibfk_1`;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD CONSTRAINT `ActivityEntity_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ActivityEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEntity` ADD CONSTRAINT `ActivityEntity_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD CONSTRAINT `CommentEntity_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD CONSTRAINT `CommentEntity_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD CONSTRAINT `CommentEntity_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `CommentEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD CONSTRAINT `CommentEntity_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEntity` ADD CONSTRAINT `ProfileEntity_username_fkey` FOREIGN KEY (`username`) REFERENCES `UserEntity`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD CONSTRAINT `ProfileSkillsEntity_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkillsEntity` ADD CONSTRAINT `ProfileSkillsEntity_skillsId_fkey` FOREIGN KEY (`skillsId`) REFERENCES `SkillsEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD CONSTRAINT `SocialMediaMatchingEntity_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD CONSTRAINT `SocialMediaMatchingEntity_socialMediaId_fkey` FOREIGN KEY (`socialMediaId`) REFERENCES `SocialMediaEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaMatchingEntity` ADD CONSTRAINT `SocialMediaMatchingEntity_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `EmployerEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEmployerEntity` ADD CONSTRAINT `ProfileEmployerEntity_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `EmployerEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileEmployerEntity` ADD CONSTRAINT `ProfileEmployerEntity_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ProfileEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD CONSTRAINT `ProjectSummaryEntity_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD CONSTRAINT `ProjectSummaryEntity_reporting_user_id_fkey` FOREIGN KEY (`reporting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD CONSTRAINT `ProjectsAssigneeEntity_projectsId_fkey` FOREIGN KEY (`projectsId`) REFERENCES `ProjectsEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsAssigneeEntity` ADD CONSTRAINT `ProjectsAssigneeEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD CONSTRAINT `UserEventsEntity_target_user_id_fkey` FOREIGN KEY (`target_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEventsEntity` ADD CONSTRAINT `UserEventsEntity_acting_user_id_fkey` FOREIGN KEY (`acting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD CONSTRAINT `UserRolesEntity_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `RolesEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesEntity` ADD CONSTRAINT `UserRolesEntity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD CONSTRAINT `UserTagsEntity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTagsEntity` ADD CONSTRAINT `UserTagsEntity_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `TagsEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `ProfileEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_story_id_fkey` FOREIGN KEY (`story_id`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenusEntity` ADD CONSTRAINT `MenusEntity_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `MenusEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenusEntity` ADD CONSTRAINT `RoleMenusEntity_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `RolesEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenusEntity` ADD CONSTRAINT `RoleMenusEntity_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `MenusEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialUserFollower` ADD CONSTRAINT `SocialUserFollower_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialUserFollower` ADD CONSTRAINT `SocialUserFollower_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStory` ADD CONSTRAINT `SocialStory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStoryUserLike` ADD CONSTRAINT `SocialStoryUserLike_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialStoryUserLike` ADD CONSTRAINT `SocialStoryUserLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialActivity` ADD CONSTRAINT `SocialActivity_operatorId_fkey` FOREIGN KEY (`operatorId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialActivity` ADD CONSTRAINT `SocialActivity_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialActivity` ADD CONSTRAINT `SocialActivity_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `SocialStory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalyticByCity` ADD CONSTRAINT `AnalyticByCity_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalyticByLanguage` ADD CONSTRAINT `AnalyticByLanguage_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Language` RENAME INDEX `Language.language_unique` TO `Language_language_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `MediaAsset_profile_id_unique` TO `MediaAsset_profile_id_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `MediaAsset_project_id_unique` TO `MediaAsset_project_id_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `MediaAsset_user_id_unique` TO `MediaAsset_user_id_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `profile_alt_unique_constraint` TO `MediaAsset_profile_id_alt_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `project_alt_unique_constraint` TO `MediaAsset_project_id_alt_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `src_alt_unique_constraint` TO `MediaAsset_src_alt_key`;

-- RenameIndex
ALTER TABLE `MediaAsset` RENAME INDEX `story_alt_unique_constraint` TO `MediaAsset_story_id_alt_key`;

-- RenameIndex
ALTER TABLE `MenusEntity` RENAME INDEX `MenusEntity.key_unique` TO `MenusEntity_key_key`;

-- RenameIndex
ALTER TABLE `ProfileEntity` RENAME INDEX `ProfileEntity.username_unique` TO `ProfileEntity_username_key`;

-- RenameIndex
ALTER TABLE `ProjectSummaryEntity` RENAME INDEX `ProjectSummaryEntity.project_id_unique` TO `ProjectSummaryEntity_project_id_key`;

-- RenameIndex
ALTER TABLE `RoleMenusEntity` RENAME INDEX `RoleMenusEntity.roleId_menuId_unique` TO `RoleMenusEntity_roleId_menuId_key`;

-- RenameIndex
ALTER TABLE `RolesEntity` RENAME INDEX `RolesEntity.role_unique` TO `RolesEntity_role_key`;

-- RenameIndex
ALTER TABLE `SkillsEntity` RENAME INDEX `SkillsEntity.name_unique` TO `SkillsEntity_name_key`;

-- RenameIndex
ALTER TABLE `SocialStoryUserLike` RENAME INDEX `SocialStoryUserLike.storyId_userId_unique` TO `SocialStoryUserLike_storyId_userId_key`;

-- RenameIndex
ALTER TABLE `SocialUserFollower` RENAME INDEX `SocialUserFollower.userId_followerId_unique` TO `SocialUserFollower_userId_followerId_key`;

-- RenameIndex
ALTER TABLE `TagsEntity` RENAME INDEX `TagsEntity.name_unique` TO `TagsEntity_name_key`;

-- RenameIndex
ALTER TABLE `UserEntity` RENAME INDEX `UserEntity.emailVerifyToken_unique` TO `UserEntity_emailVerifyToken_key`;

-- RenameIndex
ALTER TABLE `UserEntity` RENAME INDEX `UserEntity.passwordResetToken_unique` TO `UserEntity_passwordResetToken_key`;

-- RenameIndex
ALTER TABLE `UserEntity` RENAME INDEX `UserEntity.username_unique` TO `UserEntity_username_key`;

-- RenameIndex
ALTER TABLE `UserRolesEntity` RENAME INDEX `UserRolesEntity.user_id_role_id_unique` TO `UserRolesEntity_user_id_role_id_key`;

-- RenameIndex
ALTER TABLE `UserTagsEntity` RENAME INDEX `UserTagsEntity.user_id_tag_id_unique` TO `UserTagsEntity_user_id_tag_id_key`;
