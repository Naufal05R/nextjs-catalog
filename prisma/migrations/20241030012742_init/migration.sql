/*
  Warnings:

  - You are about to drop the column `url` on the `Collection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Collection_url_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "url",
ADD COLUMN     "slug" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");
