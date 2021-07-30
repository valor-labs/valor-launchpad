/*
  Warnings:

  - A unique constraint covering the columns `[src,alt]` on the table `MediaAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `src_alt_unique_constraint` ON `MediaAsset`(`src`, `alt`);
