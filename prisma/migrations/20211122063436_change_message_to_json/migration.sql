/*
  Warnings:

  - You are about to alter the column `message` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `Json`.

*/
-- AlterTable
ALTER TABLE `ChatMessage` MODIFY `message` JSON NOT NULL;
