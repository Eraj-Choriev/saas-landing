/** @type {import('next').NextConfig} */
// Deployed on Vercel (native Next.js runtime). No static export and no basePath:
// the site is served at the root of its own domain, so assets resolve from "/".
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false, // hide the dev-only Next.js devtools button (bottom-left "N")
  images: { unoptimized: true },
  trailingSlash: true,
}
export default nextConfig
