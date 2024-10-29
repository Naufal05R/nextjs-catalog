/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_id_key" ON "Collection"("id");
