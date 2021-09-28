-- CreateTable
CREATE TABLE `CryptoMainInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(36) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `priceByUS` DECIMAL(65, 30) NOT NULL,
    `volume` DECIMAL(65, 30) NOT NULL,
    `change` DECIMAL(5, 3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryptoMarkets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin` VARCHAR(36) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `volume` DECIMAL(65, 30) NOT NULL,
    `change` DECIMAL(5, 3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryptoOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('BUY', 'SELL') NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `eth` DECIMAL(65, 30) NOT NULL,
    `btc` DECIMAL(65, 30) NOT NULL,
    `sum` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryptoValueHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(6) NOT NULL,
    `open` DECIMAL(65, 30) NOT NULL,
    `close` DECIMAL(65, 30) NOT NULL,
    `high` DECIMAL(65, 30) NOT NULL,
    `low` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
