/** @type {import('next').NextConfig} */
// Standalone app, served at the root of its own domain — no basePath.
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // There is a second lockfile one level up (the marketing site), so Next cannot
  // infer which directory is the workspace root. Pin it to this project.
  outputFileTracingRoot: import.meta.dirname,
  // Opening the dev server from another device on the LAN (a phone, a second
  // laptop) is a cross-origin request to /_next/*. Next warns about it today and
  // will reject it in a future major, so the usual private ranges are allowed
  // up front. Dev only — this has no effect on a production build.
  allowedDevOrigins: [
    "192.168.0.*",
    "192.168.1.*",
    "10.0.0.*",
    "172.20.10.*",
    "*.local",
  ],
}
export default nextConfig
