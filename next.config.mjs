import createMDX from "@next/mdx";

const SERVER_HOST = process.env.MINIO_SERVER_HOST || "";
const SERVER_PORT = process.env.MINIO_SERVER_PORT
const NETWORK_PROTOCOL = process.env.MINIO_NETWORK_PROTOCOL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  images: {
    remotePatterns: [
      {
        protocol: NETWORK_PROTOCOL,
        hostname: SERVER_HOST,
        port: SERVER_PORT,
        pathname: "/nextjs-catalog/**",
      },
    ],
  },

  rewrites: async () => {
    return [
      {
        source: "/products",
        destination: "/collections",
      },
      {
        source: "/collections/:collection*/products",
        destination: "/collections/:collection*",
      },
    ];
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
          options: { babel: false },
        },
      ],
    });
    return config;
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          options: { babel: false },
          as: "*.js",
        },
      },
    },
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
