/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  basePath: isProd ? "" : "",      // repo name
  assetPrefix: isProd ? "" : "",  // makes static assets load
  images: {
    unoptimized: true,     // <-- important for GitHub Pages
  },
};

export default nextConfig;
