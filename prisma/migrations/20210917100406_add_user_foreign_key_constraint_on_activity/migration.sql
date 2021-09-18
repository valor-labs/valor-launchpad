-- AddForeignKey
ALTER TABLE `SocialActivity` ADD FOREIGN KEY (`operatorId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialActivity` ADD FOREIGN KEY (`targetUserId`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
