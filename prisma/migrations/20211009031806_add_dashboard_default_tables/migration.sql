-- CreateTable
CREATE TABLE `DashboardDefaultOverview` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `totalEarnings` DECIMAL(65, 30) NOT NULL,
    `pendingOrders` INTEGER NOT NULL,
    `totalRevenue` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardDefaultMonthlyRevenue` (
    `id` VARCHAR(36) NOT NULL,
    `month` DATE NOT NULL,
    `revenue` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardDefaultDailyRevenue` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `source` VARCHAR(255) NOT NULL,
    `revenue` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
