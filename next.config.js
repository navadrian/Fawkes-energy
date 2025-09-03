/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['localhost'],
  },
  // Enable static optimization
  trailingSlash: false,
  // Optimize for performance
  swcMinify: true,
  // Enable compression
  compress: true,
}

module.exports = nextConfig
