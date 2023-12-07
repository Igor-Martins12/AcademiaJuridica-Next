/*
  Warnings:

  - You are about to drop the `ExVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ExVideo`;

-- CreateTable
CREATE TABLE `ReactData` (
    `id` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `playbackId` VARCHAR(191) NULL,
    `chapterId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ReactData_chapterId_key`(`chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
