// Inspired by shopify/polaris-react storybook config
// https://github.com/Shopify/polaris-react/blob/main/.storybook/main.js

const path = require('path');

const postcssShopify = require('@shopify/postcss-plugin');

module.exports = {
  stories: [
    // '../src/**/*.stories.@(mdx|tsx)',
    '../playground/**/*.stories.@(mdx|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {name: '@storybook/addon-essentials', options: {docs: true}},
  ],
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

    // Shrink ray only strips hashes when comparing filenames with this format.
    // Without this there will be lots of "add 1 file and removed 1 file" notices.
    config.output.filename = '[name]-[hash].js';

    const extraRules = [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap: false,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => postcssShopify(),
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ];

    config.module.rules = [
      // Strip out existing rules that apply to md files
      ...config.module.rules.filter(
        (rule) => rule.test.toString() !== '/\\.md$/',
      ),
      ...extraRules,
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@shopify/polaris-viz': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
};
