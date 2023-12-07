/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `ReactData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ReactData` DROP COLUMN `videoUrl`,
    ADD COLUMN `urlVideo` TEXT NULL;
