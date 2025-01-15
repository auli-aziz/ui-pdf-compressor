/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader", // Ignore HTML files
    });
    return config;
  },
};

export default nextConfig;
