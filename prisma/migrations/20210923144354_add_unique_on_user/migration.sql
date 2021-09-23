/*
  Warnings:

  - A unique constraint covering the columns `[user_id,role_id]` on the table `UserRolesEntity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,tag_id]` on the table `UserTagsEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserRolesEntity.user_id_role_id_unique` ON `UserRolesEntity`(`user_id`, `role_id`);

-- CreateIndex
CREATE UNIQUE INDEX `UserTagsEntity.user_id_tag_id_unique` ON `UserTagsEntity`(`user_id`, `tag_id`);
