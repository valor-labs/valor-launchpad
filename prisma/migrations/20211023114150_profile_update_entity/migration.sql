-- AlterTable
ALTER TABLE `ProfileEntity` ADD COLUMN `address` VARCHAR(255),
    ADD COLUMN `bio` VARCHAR(255),
    ADD COLUMN `city` VARCHAR(255),
    ADD COLUMN `language` VARCHAR(255),
    ADD COLUMN `locale` VARCHAR(255),
    ADD COLUMN `timeZone` VARCHAR(255),
    ADD COLUMN `zip` VARCHAR(255);
