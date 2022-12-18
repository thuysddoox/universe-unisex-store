const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    images: {
      layoutRaw: true
    },
    scrollRestoration: true
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withBundleAnalyzer(nextConfig);
