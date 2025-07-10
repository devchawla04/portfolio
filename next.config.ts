import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const webpack = require('webpack');
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^canvas$/,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
