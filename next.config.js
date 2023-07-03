const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
        pathname: '/img/wn/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        permanent: false,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
