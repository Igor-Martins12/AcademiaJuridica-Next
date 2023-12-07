/*
  Warnings:

  - You are about to drop the column `assetId` on the `ReactData` table. All the data in the column will be lost.
  - You are about to drop the column `playbackId` on the `ReactData` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ReactData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReactData` DROP COLUMN `assetId`,
    DROP COLUMN `playbackId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `videoUrl` TEXT NULL;

-- CreateIndex
CREATE INDEX `ReactData_chapterId_idx` ON `ReactData`(`chapterId`);
