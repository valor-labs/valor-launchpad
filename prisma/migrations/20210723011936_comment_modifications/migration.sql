/*
  Warnings:

  - You are about to drop the column `author` on the `CommentEntity` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `CommentEntity` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `CommentEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CommentEntity` DROP COLUMN `author`,
    DROP COLUMN `avatar`,
    ADD COLUMN `author_id` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `CommentEntity` ADD FOREIGN KEY (`author_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
