/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // On Vercel, do NOT export static HTML; use SSR/SSG
  // Remove output: "export" for full Next.js capabilities
  // output: "export",

  // basePath and assetPrefix are not needed on Vercel
  // basePath: isProd ? "/FormZ" : "",
  // assetPrefix: isProd ? "/FormZ/" : "",

  reactStrictMode: true,
  images: {
    unoptimized: true, // optional, only if you want no image optimization
  },
};

export default nextConfig;
