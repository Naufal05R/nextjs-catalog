import { handlingPrismaErrors } from "../prisma/error";

export const serviceError = (error: unknown) => (typeof error === "string" ? error : handlingPrismaErrors(error));

export const extensionError = (allowed: readonly string[], ext?: string) =>
  `Error: unexpected extensions! Extension should be only be ${allowed.join(", ")}. Extension ${ext} is not currently supported!`;

export const resourceError = (resource?: "article" | "thumbnail" | (string & {})) =>
  `Error: couldn't find resource! Resource ${resource} isn't available!`;
