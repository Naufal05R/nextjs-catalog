-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
