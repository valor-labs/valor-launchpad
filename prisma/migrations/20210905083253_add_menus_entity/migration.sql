-- CreateTable
CREATE TABLE `MenusEntity` (
    `id` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `key` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `isMega` BOOLEAN NOT NULL,
    `route` VARCHAR(255),
    `icon` VARCHAR(255),
    `parentId` VARCHAR(36),

    UNIQUE INDEX `MenusEntity.key_unique`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleMenusEntity` (
    `id` VARCHAR(36) NOT NULL,
    `roleId` VARCHAR(36) NOT NULL,
    `menuId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `RoleMenusEntity.roleId_menuId_unique`(`roleId`, `menuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenusEntity` ADD FOREIGN KEY (`parentId`) REFERENCES `MenusEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenusEntity` ADD FOREIGN KEY (`roleId`) REFERENCES `RolesEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenusEntity` ADD FOREIGN KEY (`menuId`) REFERENCES `MenusEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
