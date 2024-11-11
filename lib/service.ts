import * as Minio from "minio";
import internal from "stream";
import { handlingError } from "./utils";

const SERVER_HOST: string = process.env.MINIO_SERVER_HOST || "";
const SERVER_PORT: number = parseInt(process.env.MINIO_SERVER_PORT || "");
const SECURE_URL: boolean = process.env.MINIO_SECURE_URL === "true";
const ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY || "";
const SECRET_KEY: string = process.env.MINIO_SECRET_KEY || "";

const minioClient = new Minio.Client({
  endPoint: SERVER_HOST,
  port: SERVER_PORT,
  useSSL: SECURE_URL,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
});

export const getAllBuckets = async () => {
  try {
    const buckets = await minioClient.listBuckets();

    return buckets;
  } catch (error) {
    console.error("Error getting all buckets: ", error);
  }
};

export const createObject = async ({
  bucketName,
  objectName,
  objectStream,
  objectSize,
  objectMetaData,
}: {
  bucketName: string;
  objectName: string;
  objectStream: internal.Readable | Buffer | string;
  objectSize?: number;
  objectMetaData?: Record<string, unknown>;
}) => {
  try {
    const result = await minioClient.putObject(bucketName, objectName, objectStream, objectSize, objectMetaData);

    return result;
  } catch (error) {
    handlingError(error);
  }
};

export const getObject = async ({
  bucketName,
  objectName,
  filePath,
  options,
}: {
  bucketName: string;
  objectName: string;
  filePath: string;
  options: Parameters<typeof minioClient.fGetObject>[3];
}) => {
  try {
    const result = await minioClient.fGetObject(bucketName, objectName, filePath, options);

    return result;
  } catch (error) {
    handlingError(error);
  }
};

export const streamObjects = ({ bucketName, includeMetadata }: { bucketName: string; includeMetadata?: boolean }) => {
  const stream: Minio.BucketStream<Minio.BucketItem> = includeMetadata
    ? minioClient.extensions.listObjectsV2WithMetadata(bucketName)
    : minioClient.listObjectsV2(bucketName);

  stream.on("data", function (data) {
    console.log("V2", data);
  });

  stream.on("error", function (error) {
    handlingError(error);
  });
};

export const deleteObjects = ({ bucketName, prefix }: { bucketName: string; prefix: string }) => {
  const objectsList: Array<string> = [];

  if (!prefix) throw new Error("Prefix is required!");

  const objectsStream = minioClient.listObjects(bucketName, prefix, true);

  objectsStream.on("data", function (object) {
    if (object.name) {
      objectsList.push(object.name);
    }
  });

  objectsStream.on("error", function (error) {
    handlingError(error);
  });

  objectsStream.on("end", async () => {
    await minioClient.removeObjects(bucketName, objectsList);
  });
};
