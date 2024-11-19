import { dirname, join } from "path";
// Inspired by shopify/polaris-react storybook config
// https://github.com/Shopify/polaris-react/blob/main/.storybook/main.js

const path = require('path');

const postcssShopify = require('@shopify/postcss-plugin');

const getStories = require('./getStories');

const getAbsolutePath = (value) => dirname(require.resolve(join(value, 'package.json')));

export default {
  core: {
    disableTelemetry: true,
  },
  stories: getStories(),

  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    {
      name: '@storybook/addon-essentials',
      options: { docs: true, backgrounds: false },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },

  async webpackFinal(config) {
    const isProduction = config.mode === 'production';

    // Customize output filename format for better cache handling
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
            options: {
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
              postcssOptions: {
                plugins: () => postcssShopify(),
              },
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
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['babel-preset-expo'],
        },
      },
    ];

    // Remove existing rules that apply to md files
    config.module.rules = [
      ...config.module.rules.filter((rule) => rule?.test?.toString() !== '/\\.md$/'),
      ...extraRules,
    ];

    // Adjust for react-native-svg support
    config.resolve.extensions.unshift('.web.js');

    // Configure aliases for module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@shopify/polaris-viz': path.resolve(__dirname, '..', 'packages/polaris-viz/src'),
      '@shopify/polaris-viz-core': path.resolve(__dirname, '..', 'packages/polaris-viz-core/src'),
    };

    return config;
  },
};