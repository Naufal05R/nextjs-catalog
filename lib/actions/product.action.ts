"use server";

import { ProductFormSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { getFileMimeTypes, handlingError, initRawData, padValue, slugify } from "../utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createObject, deleteObjects } from "../service";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

type GetAllProductProps = {
  where?: Prisma.ProductWhereInput;
};

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";

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

export const getProduct = async ({ where }: GetAllProductProps) => {
  try {
    const product = await prisma.product.findFirst({
      where,
      include: {
        gallery: {
          select: {
            medias: true,
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
            bucketName: APP_NAME,
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

export const updateProduct = async (
  prevstate: string[] | z.ZodIssue[] | void,
  { formData, collection, id }: { formData: FormData; collection: string; id: string },
) => {
  const { success, data, error } = ProductFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { medias, ...product } = data;
    let pathname: string = `/dashboard/products/${collection}/edit/${slugify(product.title)}`;

    try {
      for (const { title, order, media } of medias) {
        if (media) {
          const { fileMime } = getFileMimeTypes(media.type);
          const fileName = `${padValue(order)}_${slugify(title)}.${fileMime}`;
          const previewFile = new File([media], fileName, { type: media.type });
          const arrayBuffer = await previewFile.arrayBuffer();
          const imageBuffer = Buffer.from(arrayBuffer as ArrayBuffer);
          const objectParams: Parameters<typeof createObject>[0] = {
            bucketName: APP_NAME,
            objectName: `${slugify(collection)}/${slugify(product.title)}/${fileName}`,
            objectStream: imageBuffer,
            objectMetaData: {
              "Content-Type": media.type,
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

      console.log(files);

      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        if (_collection) {
          const _newProduct = await _prisma.product.update({
            where: { id },
            data: {
              ...product,
              slug: slugify(product.title),
              collectionId: _collection.id,
            },
          });

          const _gallery = await _prisma.gallery.update({
            where: { slug: slugify(product.title) },
            data: {
              title: product.title,
              slug: slugify(product.title),
              productId: _newProduct.id,
            },
          });

          await _prisma.media.deleteMany({
            where: {
              galleryId: _gallery.id,
            },
          });

          for (const file of files) {
            await _prisma.media.upsert({
              where: {
                slug: file.slug,
              },
              update: {},
              create: {
                ...file,
                galleryId: _gallery.id,
              },
            });
          }
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

export const unarchiveProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;

  if (id) {
    try {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          isReady: true,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      handlingError(error);
    }
  }
};

export const deleteProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;

  if (id) {
    try {
      const selectedProduct = await prisma.product.findUnique({
        where: {
          id,
        },
        select: {
          slug: true,
          collection: {
            select: {
              slug: true,
            },
          },
        },
      });

      if (selectedProduct) {
        await prisma.$transaction(async (_prisma) => {
          await _prisma.product.delete({
            where: {
              id,
            },
          });

          deleteObjects({
            bucketName: APP_NAME,
            prefix: `${selectedProduct.collection.slug}/${selectedProduct.slug}/`,
          });
        });

        revalidatePath("/", "layout");
      } else {
        throw new Error("Product not found!");
      }
    } catch (error) {
      handlingError(error);
    }
  }
};
