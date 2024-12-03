import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  rewrites: async () => {
    return [
      {
        source: "/products",
        destination: "/collections",
      },
      {
        source: "/collections/:path*/products",
        destination: "/collections/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/nextjs-catalog/**",
      },
    ],
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
