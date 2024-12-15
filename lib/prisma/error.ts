import { Prisma } from "@prisma/client";

const uniqueViolation = (fields: string) => `There is a unique constraint violation: ${fields} must be a unique value.`;

const handlingKnownErrors = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === "P2002") {
    if (error.meta?.target instanceof Array) {
      const fields = [
        ...new Set(
          error.meta.target
            .filter((field) => typeof field === "string")
            .map((field) => (field === "slug" ? "title" : field)),
        ),
      ].join(", ");

      return uniqueViolation(fields);
    } else {
      return uniqueViolation("One or more fields");
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
