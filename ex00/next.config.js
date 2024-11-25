/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
        pathname: '**',
      }
    ],
    domains: ['image.pollinations.ai', 'avatars.githubusercontent.com'],
  }
};

module.exports = nextConfig;