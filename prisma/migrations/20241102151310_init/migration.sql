/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_galleryId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "name" VARCHAR(132) NOT NULL,
    "order" SMALLINT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_title_key" ON "Media"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Media_slug_key" ON "Media"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "Media"("name");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
