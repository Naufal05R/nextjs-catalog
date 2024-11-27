"use server";

import { ProductFormSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { getFileMimeTypes, handlingError, initRawData, padValue, slugify } from "../utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createObject, deleteObjects } from "../service";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { MAX_ITEM_PER_PAGE } from "@/constants";

type GetAllProductProps = {
  where?: Prisma.ProductWhereInput;
};

interface ProductResult {
  query: string;
  currentPage: number;
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";

export const getAllProduct = async (params: GetAllProductProps | undefined = undefined) => {
  const { where } = params ?? {};

  try {
    const allProducts = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
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
        tags: true,
      },
    });

    return allProducts;
  } catch (error) {
    handlingError(error);
  }
};

export const getProduct = async (params: GetAllProductProps | undefined = undefined) => {
  const { where } = params ?? {};

  try {
    const product = await prisma.product.findFirst({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: {
          select: {
            slug: true,
          },
        },
        gallery: {
          select: {
            medias: true,
          },
        },
        tags: true,
      },
    });

    return product;
  } catch (error) {
    handlingError(error);
  }
};

export const getProductPages = async ({ query, currentPage }: ProductResult) => {
  try {
    const totalAnimals = await prisma.product.count({
      skip: (currentPage - 1) * MAX_ITEM_PER_PAGE,
      take: MAX_ITEM_PER_PAGE,
      where: {
        isReady: true,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            slug: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            state: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            color: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                OR: [
                  {
                    title: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    slug: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalAnimals / MAX_ITEM_PER_PAGE);

    return totalPages;
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
    const { medias, tags, ...product } = data;
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

      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        if (_collection) {
          await _prisma.tag.createMany({
            data: tags.map((tag) => ({ title: tag, slug: slugify(tag) })),
            skipDuplicates: true,
          });

          const _product = await _prisma.product.create({
            data: {
              ...product,
              slug: slugify(product.title),
              collectionId: _collection.id,
              tags: {
                connectOrCreate: tags.map((tag) => ({
                  where: { slug: slugify(tag) },
                  create: { title: tag, slug: slugify(tag) },
                })),
              },
            },
          });

          const _gallery = await _prisma.gallery.create({
            data: {
              title: product.title,
              slug: slugify(product.title),
              productId: _product.id,
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
    const { medias, tags, ...product } = data;
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

      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        if (_collection) {
          await _prisma.tag.createMany({
            data: tags.map((tag) => ({ title: tag, slug: slugify(tag) })),
            skipDuplicates: true,
          });

          const _tags = await _prisma.tag.findMany({
            where: { slug: { in: tags.map((tag) => slugify(tag)) } },
          });

          const _product = await _prisma.product.update({
            where: { id },
            data: {
              ...product,
              slug: slugify(product.title),
              collectionId: _collection.id,
            },
          });

          // TODO: Should fixing bug in here!
          // !Unexpected behavior when trying to adjust tags in product
          // !Changing implementation

          await _prisma.tagsOnProducts.createManyAndReturn({
            data: _tags.map(({ id }) => ({ tagId: id, productId: _product.id })),
            skipDuplicates: true,
          });

          const _gallery = await _prisma.gallery.update({
            where: { slug: slugify(product.title) },
            data: {
              title: product.title,
              slug: slugify(product.title),
              productId: _product.id,
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

export const toggleFavoriteProduct = async (prevState: string | undefined, formData: FormData) => {
  const id = formData.get("id") as string;
  const min = 3 as const;
  const max = 7 as const;

  if (id) {
    try {
      const message = await prisma.$transaction(async (_prisma) => {
        const totalFavoriteProduct = await _prisma.product.count({
          where: {
            isFavorite: true,
          },
        });

        const selectedProduct = await _prisma.product.findUnique({
          where: { id },
        });

        if (!selectedProduct) throw Error("Error: Invalid Product");
        if (selectedProduct.isFavorite === false && totalFavoriteProduct >= max)
          return `Can't add product from favorite! Max product to be favorited is ${max}`;
        if (selectedProduct.isFavorite === true && totalFavoriteProduct <= min)
          return `Can't remove product from favorite! Min product to be favorited is ${min}`;

        await _prisma.product.update({
          where: { id },
          data: {
            isFavorite: !selectedProduct?.isFavorite,
          },
        });
      });

      revalidatePath("/", "layout");

      return message;
    } catch (error) {
      handlingError(error);
    }
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
