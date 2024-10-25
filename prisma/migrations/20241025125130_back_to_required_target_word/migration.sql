/*
  Warnings:

  - Made the column `target_date` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "games" ALTER COLUMN "target_date" SET NOT NULL;
