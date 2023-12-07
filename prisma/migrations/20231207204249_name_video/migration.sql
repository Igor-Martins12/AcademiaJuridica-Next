/*
  Warnings:

  - Added the required column `name` to the `ReactData` table without a default value. This is not possible if the table is not empty.
  - Made the column `urlVideo` on table `ReactData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ReactData` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `urlVideo` TEXT NOT NULL;
