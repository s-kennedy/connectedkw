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
      {
        protocol: 'https',
        hostname: 'vqgbaydvbxbwpgbjrquo.supabase.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wpl.libnet.info',
        pathname: '/images/events/wpl/**',
      },
      {
        protocol: 'https',
        hostname: 'events-calendar-public-us-east-2.s3.us-east-2.amazonaws.com',
        pathname: '/event-images/**',
      }
    ],
  }
}

module.exports = withMDX(withPWA(nextConfig))
