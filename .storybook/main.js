const path = require('path');
const spawn = require('child_process').spawn;

const postcssShopify = require('postcss-shopify');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = {
  stories: ['../playground/stories.tsx', '../src/components/**/*/README.md'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    '@storybook/addon-notes',
    '@storybook/addon-a11y',
    '@storybook/addon-contexts',
  ],
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

    // When transpiling TS using isolatedModules, the compiler doesn't strip
    // out exported types as it doesn't know if an item is a type or not.
    // Ignore those warnings as we don't care about them.
    const stats = {warningsFilter: /export .* was not found in/};
    config.stats = stats;
    config.devServer = {stats};

    // Shrink ray only strips hashes when comparing filenames with this format.
    // Without this there will be lots of "add 1 file and removed 1 file" notices.
    config.output.filename = '[name]-[hash].js';

    const cacheDir = path.resolve(__dirname, '../build/cache/storybook');

    const extraRules = [
      {
        test: /src\/components\/.+\/README\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: `${cacheDir}/markdown`,
            },
          },
          {
            loader: `${__dirname}/polaris-readme-loader.js`,
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: `${cacheDir}/typescript`,
            },
          },
        ],
      },
      {
        test(resource) {
          return (
            IMAGE_PATH_REGEX.test(resource) && !ICON_PATH_REGEX.test(resource)
          );
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
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
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]_[hash:base64:5]',
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

    config.module.rules = [config.module.rules[0], ...extraRules];

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shopify/polaris-viz': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
};
