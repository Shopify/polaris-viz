// Inspired by: https://github.com/Shopify/web/blob/main/.storybook/theme.ts
import {create} from '@storybook/theming';

import logo from './polaris-viz-logo.svg';

export default create({
  base: 'dark',
  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',
  brandImage: logo,
  fontBase:
    "Inter, -apple-system, 'system-ui', 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  fontCode: "Monaco, Consolas, 'Lucida Console', monospace",
});
