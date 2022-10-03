const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
      images: {
          layoutRaw: true
      },
      scrollRestoration: true
  },
  images: {
    domains: ['cdn.prism.horse'],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withBundleAnalyzer(nextConfig);
