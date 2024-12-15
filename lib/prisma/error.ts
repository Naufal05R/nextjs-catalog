import { Prisma } from "@prisma/client";

const handlingKnownErrors = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === "P2002") {
    if (error.meta?.target instanceof Array) {
      const fields = error.meta?.target.filter((field) => typeof field === "string").join(", ");
      return `There is a unique constraint violation: ${fields} must be a unique value.`;
    } else {
      return `There is a unique constraint violation: One or more fields must be a unique value.`;
    }
  } else {
    console.dir(error.meta, { depth: null });
    return `Error ${error.code} was thrown from the server!\n Please report this bug!`;
  }
};

export const handlingPrismaErrors = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlingKnownErrors(error);
  } else return "Something went wrong from the server! Please report this bug!";
};
