/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === "1";

const nextConfig = {
  output: "export",
  basePath: isVercel ? "" : "/FormZ",
  assetPrefix: isVercel ? "" : "/FormZ/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
