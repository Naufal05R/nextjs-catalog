"use server";

import { toBase64 } from "../utils";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export const getDynamicBlurDataURL = async (url: string) => {
  const base64str = await fetch(`${SERVER_URL}/_next/image?url=${url}&w=16&q=75`).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64"),
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
};
