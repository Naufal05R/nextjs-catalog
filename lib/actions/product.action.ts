"use server";

import { ProductFormSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { getFileMimeTypes, handlingError, initRawData, padValue, slugify } from "../utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createObject } from "../service";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

type GetAllProductProps = {
  where?: Prisma.ProductWhereInput;
};

export const getAllProduct = async ({ where }: GetAllProductProps) => {
  try {
    const allProducts = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            title: true,
          },
        },
        collection: {
          select: {
            slug: true,
          },
        },
        gallery: {
          select: {
            medias: {
              take: 1,
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return allProducts;
  } catch (error) {
    handlingError(error);
  }
};

export const getProducts = async (identifier: string, field: keyof z.infer<typeof ProductSchema>) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        [field]: identifier,
      },
      include: {
        gallery: {
          select: {
            medias: {
              take: 1,
              where: {
                order: 0,
              },
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    handlingError(error);
  }
};

export const createProduct = async (
  prevstate: string[] | z.ZodIssue[] | void,
  { formData, collection }: { formData: FormData; collection: string },
) => {
  console.log(initRawData(formData));
  const { success, data, error } = ProductFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { medias, ...product } = data;
    let pathname: string = `/dashboard/products/${collection}/add`;

    try {
      for (const { title, order, media } of medias) {
        if (media) {
          const { fileMime } = getFileMimeTypes(media.type);
          const fileName = `${padValue(order)}_${slugify(title)}.${fileMime}`;
          const previewFile = new File([media], fileName, { type: media.type });
          const arrayBuffer = await previewFile.arrayBuffer();
          const imageBuffer = Buffer.from(arrayBuffer as ArrayBuffer);
          const objectParams: Parameters<typeof createObject>[0] = {
            bucketName: "nextjs-catalog",
            objectName: `${slugify(collection)}/${slugify(product.title)}/${fileName}`,
            objectStream: imageBuffer,
            objectMetaData: {
              title,
              order,
            },
          };

          await createObject(objectParams);
        }
      }

      const files = medias
        .sort((a, b) => a.order - b.order)
        .map(({ title, order, media }) => {
          const { fileMime } = getFileMimeTypes(media!.type);
          const fileName = `${padValue(order)}_${slugify(title)}.${fileMime}`;
          return { title, slug: slugify(title), order, name: fileName };
        });

      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        if (_collection) {
          const _newProduct = await _prisma.product.create({
            data: {
              ...product,
              slug: slugify(product.title),
              collectionId: _collection.id,
            },
          });

          const _gallery = await _prisma.gallery.create({
            data: {
              title: product.title,
              slug: slugify(product.title),
              productId: _newProduct.id,
            },
          });

          await _prisma.media.createMany({
            data: files.map((file) => {
              return {
                galleryId: _gallery.id,
                ...file,
              };
            }),
          });
        } else throw new Error("Collection not found");
      });

      pathname = `/dashboard/products/${collection}`;
      revalidatePath("/", "layout");

      return newProduct;
    } catch (error) {
      handlingError(error);
    } finally {
      redirect(pathname);
    }
  } else {
    return error.errors;
  }
};

export const archiveProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;

  console.log("executed");

  if (id) {
    try {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          isReady: false,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      handlingError(error);
    }
  }
};
