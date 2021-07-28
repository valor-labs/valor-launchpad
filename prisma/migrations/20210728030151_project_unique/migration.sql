/*
  Warnings:

  - A unique constraint covering the columns `[project_id,alt]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `project_alt_unique_constraint` ON `MediaAsset`(`project_id`, `alt`);
