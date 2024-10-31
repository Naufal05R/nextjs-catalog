/*
  Warnings:

  - You are about to alter the column `discount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" VARCHAR(64) NOT NULL,
ADD COLUMN     "height" REAL NOT NULL,
ADD COLUMN     "length" REAL NOT NULL,
ADD COLUMN     "weight" REAL NOT NULL,
ADD COLUMN     "width" REAL NOT NULL,
ALTER COLUMN "discount" SET DATA TYPE REAL;
