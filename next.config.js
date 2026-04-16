/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    domains: ['image.pollinations.ai', 'avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      followSymlinks: false,
      ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**'],
    }
    return config
  },
};

module.exports = nextConfig;