const withMDX = require('@next/mdx')()
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})


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
  }
}

module.exports = withMDX(withPWA(nextConfig))
