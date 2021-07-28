/*
  Warnings:

  - A unique constraint covering the columns `[profile_id,alt]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `profile_alt_unique_constraint` ON `MediaAsset`(`profile_id`, `alt`);
