/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'media.licdn.com', 'uploads-ssl.webflow.com'],
  },
}

module.exports = nextConfig
