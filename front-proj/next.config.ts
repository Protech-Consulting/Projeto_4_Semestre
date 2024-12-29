import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Permite carregar imagens do localhost
  },
};

export default nextConfig;
