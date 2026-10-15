import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/project-gallery",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/video",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
