/** @type {import('next').NextConfig} */
interface WebpackConfig {
  resolve: {
    alias: {
      canvas: boolean;
    };
  };
}

interface NextConfig {
  webpack: (config: WebpackConfig) => WebpackConfig;
  images?: {
    domains?: string[];
  };
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig