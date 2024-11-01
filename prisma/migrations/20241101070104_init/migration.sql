/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_collectionId_fkey";

-- DropIndex
DROP INDEX "Collection_id_key";

-- DropIndex
DROP INDEX "Product_id_key";

-- AlterTable
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "subcollectionId" TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Subcollection" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "slug" VARCHAR(16) NOT NULL,
    "description" VARCHAR(32) NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "Subcollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "slug" VARCHAR(16) NOT NULL,
    "description" VARCHAR(32) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "slug" VARCHAR(16) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "order" SMALLINT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "slug" VARCHAR(16) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcollection_title_key" ON "Subcollection"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Subcollection_slug_key" ON "Subcollection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Image_title_key" ON "Image"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Image_slug_key" ON "Image"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_title_key" ON "Gallery"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_slug_key" ON "Gallery"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_productId_key" ON "Gallery"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcollectionId_fkey" FOREIGN KEY ("subcollectionId") REFERENCES "Subcollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcollection" ADD CONSTRAINT "Subcollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
