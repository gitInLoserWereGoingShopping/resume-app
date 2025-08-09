// import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // prevent client bundling attempts of server-only deps
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
};

export default nextConfig;
