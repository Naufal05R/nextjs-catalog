"use server";

import { auth } from "@clerk/nextjs/server";

export const checkSecurityIssue = async () => {
  try {
    const { userId } = await auth();

    if (!userId) throw "Not Authorized!";
  } catch (error) {
    if (typeof error === "string") {
      throw error;
    } else {
      console.dir(error, { depth: null });
      throw "Security check failed! Please call the administrator!";
    }
  }
};
