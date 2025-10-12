/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // for static export
  basePath: "/FormZ",     // all pages will be served under /FormZ
  assetPrefix: "/FormZ/", // ensures CSS, JS, images load correctly
  images: {
    unoptimized: true,    // required for static export
  },
  async redirects() {     // optional: redirect root to /FormZ
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
