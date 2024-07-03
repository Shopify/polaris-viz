// Inspired by: https://github.com/Shopify/web/blob/main/.storybook/theme.ts
import {create} from '@storybook/theming';

import logo from './polaris-viz-logo.svg';
import {FONT_FAMILY} from '@shopify/polaris-viz-core/src/constants';

export default create({
  base: 'dark',
  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',
  brandImage: logo,
  fontBase: FONT_FAMILY,
  fontCode: "Monaco, Consolas, 'Lucida Console', monospace",
});
