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
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  }
}

module.exports = nextConfig