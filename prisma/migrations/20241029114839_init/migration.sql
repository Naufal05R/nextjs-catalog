/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "url" VARCHAR(64) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_url_key" ON "Collection"("url");
