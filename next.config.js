const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

// next.js configuration
const nextConfig = {
  images: {
    disableStaticImages: true, // due to after upgrading to v.11
    // domains: ['admin.all4skin.gr', 'sfkshop.gr', 'nitrocdn.com', 'myventema.gr', 'all4skin.gr', 'images.unsplash.com'],
    domains: [
      "admin.soul-parfumerie.gr",
      "soul-parfumerie.gr",
      "admin.all4skin.gr",
      "sfkshop.gr",
      "nitrocdn.com",
      "myventema.gr",
      "all4skin.gr",
      "images.unsplash.com",
    ],
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // target: "serverless",
  // webpack: function (config, { dev, isServer }) {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //       config.resolve.fallback.fs = false
  //   }
  //   // copy files you're interested in
  //   if (!dev) {
  //       config.plugins.push(
  //           new CopyPlugin({
  //               patterns: [{ from: "content", to: "content" }],
  //           })
  //       )
  //   }

  //   return config
  // },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
