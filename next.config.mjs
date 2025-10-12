/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  basePath: isProd ? "/form27" : "",      // repo name
  assetPrefix: isProd ? "/form27/" : "",  // makes static assets load
  images: {
    unoptimized: true,     // <-- important for GitHub Pages
  },
};

export default nextConfig;
