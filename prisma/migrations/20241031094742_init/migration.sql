/*
  Warnings:

  - You are about to drop the column `isSold` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isSold",
ADD COLUMN     "isReady" BOOLEAN NOT NULL DEFAULT true;
