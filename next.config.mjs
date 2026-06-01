/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const repo = "saas-landing"

const nextConfig = {
  reactStrictMode: true,
  devIndicators: { appIsrStatus: false }, // hide dev-only "Static route" overlay badge
  output: "export", // static HTML export for GitHub Pages
  images: { unoptimized: true },
  trailingSlash: true,
  // serve under /<repo> on GitHub Pages; root in local dev
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
}
export default nextConfig
