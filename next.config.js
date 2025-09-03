/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Optimize for performance
  swcMinify: true,
  // Enable compression
  compress: true,
}

module.exports = nextConfig
