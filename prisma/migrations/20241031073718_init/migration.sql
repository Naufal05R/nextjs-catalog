/*
  Warnings:

  - You are about to alter the column `title` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(16)`.
  - You are about to alter the column `slug` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(16)`.
  - You are about to alter the column `description` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(32)`.
  - You are about to alter the column `title` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(64)`.
  - You are about to alter the column `slug` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(64)`.
  - Added the required column `state` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "title" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collectionId" TEXT,
ADD COLUMN     "state" VARCHAR(64) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(64);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
