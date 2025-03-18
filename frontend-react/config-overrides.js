/* config-overrides.js */
const path = require('path');

module.exports = {
  webpack: function (config) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.alias,
        '@': path.resolve(__dirname, 'src/'),
      },
    };
    return config;
  },
};
