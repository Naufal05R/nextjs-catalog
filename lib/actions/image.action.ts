"use server";

import { handlingError } from "../utils";

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
const SERVER_HOST = process.env.MINIO_SERVER_HOST;
const SERVER_PORT = process.env.MINIO_SERVER_PORT;
const SECURE_URL = process.env.MINIO_SECURE_URL;

export const getImageSrc = async ({
  collection,
  product,
  name,
}: {
  collection: string;
  product: string;
  name: string;
}) => {
  try {
    const protocol = SECURE_URL === "true" ? "https" : "http";
    return `${protocol}://${SERVER_HOST}:${SERVER_PORT}/${BUCKET_NAME}/${collection}/${product}/${name}`;
  } catch (error) {
    handlingError(error);
  }
};
