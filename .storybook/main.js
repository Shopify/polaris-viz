// Inspired by shopify/polaris-react storybook config
// https://github.com/Shopify/polaris-react/blob/main/.storybook/main.js

const path = require('path');

const postcssShopify = require('@shopify/postcss-plugin');

module.exports = {
  stories: ['../**/src/**/*.stories.mdx', '../**/src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {docs: true, backgrounds: false},
    },
  ],
  framework: '@storybook/react',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
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
      {
        test: /\.(tsx|js|jsx|ejs)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['babel-preset-expo'],
        },
      },
    ];

    config.module.rules = [
      // Strip out existing rules that apply to md files
      ...config.module.rules.filter(
        (rule) => rule.test.toString() !== '/\\.md$/',
      ),
      ...extraRules,
    ];

    // This is to make react-native-svg work
    // ¯\_(ツ)_/¯
    config.resolve.extensions.unshift('.web.js');

    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@shopify/polaris-viz': path.resolve(
        __dirname,
        '..',
        'packages/polaris-viz/src',
      ),
    };
    return config;
  },
};
