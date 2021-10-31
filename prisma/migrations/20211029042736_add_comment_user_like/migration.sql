-- CreateTable
CREATE TABLE `CommentUserLike` (
    `id` VARCHAR(36) NOT NULL,
    `commentId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `createdDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deletedDate` DATETIME(6) NULL,

    UNIQUE INDEX `CommentUserLike_commentId_userId_key`(`commentId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentUserLike` ADD CONSTRAINT `CommentUserLike_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `CommentEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentUserLike` ADD CONSTRAINT `CommentUserLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
