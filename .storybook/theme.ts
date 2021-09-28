// Inspired by: https://github.com/Shopify/web/blob/master/.storybook/theme.ts
import {create} from '@storybook/theming';

import logo from './polaris-viz-logo.svg';

export default create({
  base: 'dark',
  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',
  brandImage: logo,
  fontBase:
    "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  fontCode: "Monaco, Consolas, 'Lucida Console', monospace",
});
