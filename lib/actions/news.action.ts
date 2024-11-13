"use server";

import { initRawData } from "../utils";

export const createNews = async (formData: FormData) => {
  console.log(initRawData(formData));
};
