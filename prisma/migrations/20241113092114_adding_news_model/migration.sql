-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "slug" VARCHAR(64) NOT NULL,
    "description" VARCHAR(256) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_title_key" ON "News"("title");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
