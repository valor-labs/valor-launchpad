-- CreateTable
CREATE TABLE `ProjectSummaryEntity` (
    `id` VARCHAR(36) NOT NULL,
    `event` VARCHAR(255) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` DATETIME(3) NOT NULL,
    `deletedDate` DATETIME(6),
    `project_id` VARCHAR(36) NOT NULL,
    `reporting_user_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `ProjectSummaryEntity_project_id_unique`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD FOREIGN KEY (`project_id`) REFERENCES `ProjectsEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSummaryEntity` ADD FOREIGN KEY (`reporting_user_id`) REFERENCES `UserEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
