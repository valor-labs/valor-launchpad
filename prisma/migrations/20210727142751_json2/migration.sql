/*
  Warnings:

  - You are about to alter the column `reactions` on the `ActivityEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `reactions` on the `CommentEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `badge` on the `ProjectsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `actions` on the `ProjectsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `rollupData` on the `ProjectsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `ActivityEntity` MODIFY `reactions` JSON;

-- AlterTable
ALTER TABLE `CommentEntity` MODIFY `reactions` JSON;

-- AlterTable
ALTER TABLE `ProjectsEntity` MODIFY `badge` JSON,
    MODIFY `actions` JSON,
    MODIFY `rollupData` JSON;
