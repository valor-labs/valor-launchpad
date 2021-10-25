/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TagsEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TagsEntity.name_unique` ON `TagsEntity`(`name`);
