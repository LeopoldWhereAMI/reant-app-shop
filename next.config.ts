import type { NextConfig } from "next";

const apiUrl = process.env.RENT_APP_API_URL;

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: apiUrl
      ? [
          {
            protocol: "https",
            hostname: new URL(apiUrl).hostname,
          },
        ]
      : [],
  },
};

export default nextConfig;
