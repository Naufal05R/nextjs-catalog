/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
