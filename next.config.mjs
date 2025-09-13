/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/FormZ",      // repo name
  assetPrefix: "/FormZ/",  // makes static assets load
  images: {
    unoptimized: true,     // <-- important for GitHub Pages
  },
};

export default nextConfig;
