/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "isCompleted",
ADD COLUMN     "iscompleted" BOOLEAN NOT NULL DEFAULT false;
