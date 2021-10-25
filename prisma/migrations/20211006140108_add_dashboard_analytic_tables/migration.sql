-- CreateTable
CREATE TABLE `City` (
    `id` VARCHAR(36) NOT NULL,
    `cityName` VARCHAR(255) NOT NULL,
    `longitude` FLOAT NOT NULL,
    `latitude` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` VARCHAR(36) NOT NULL,
    `language` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Language.language_unique`(`language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticOverview` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `bounce` DECIMAL(65, 30) NOT NULL,
    `bounceRatio` DECIMAL(65, 30) NOT NULL,
    `realTime` DECIMAL(65, 30) NOT NULL,
    `realTimeRatio` DECIMAL(65, 30) NOT NULL,
    `visitors` DECIMAL(65, 30) NOT NULL,
    `visitorsRatio` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticByCity` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `cityId` VARCHAR(36) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticByLanguage` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `languageId` VARCHAR(36) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticByPlatformMonthly` (
    `id` VARCHAR(36) NOT NULL,
    `month` DATE NOT NULL,
    `mobile` INTEGER NOT NULL,
    `desktop` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticByInterest` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `interest` VARCHAR(255) NOT NULL,
    `percentage` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticRevenueBySource` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `source` VARCHAR(255) NOT NULL,
    `revenue` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalyticByTraffic` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `source` VARCHAR(255) NOT NULL,
    `userCount` INTEGER NOT NULL,
    `sessionCount` INTEGER NOT NULL,
    `bounceRate` DECIMAL(65, 30) NOT NULL,
    `sessionDuration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnalyticByCity` ADD FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalyticByLanguage` ADD FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
