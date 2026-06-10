/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const repo = "saas-landing"

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false, // hide the dev-only Next.js devtools button (bottom-left "N")
  output: "export", // static HTML export for GitHub Pages
  images: { unoptimized: true },
  trailingSlash: true,
  // serve under /<repo> on GitHub Pages; root in local dev
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
}
export default nextConfig
