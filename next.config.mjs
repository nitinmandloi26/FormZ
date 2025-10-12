/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/FormZ",      // all pages are under /FormZ
  assetPrefix: "",          // remove /FormZ from static files
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/FormZ",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
