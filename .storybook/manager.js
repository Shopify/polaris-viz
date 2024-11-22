import {addons} from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  base: themes.dark,
  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',
  brandImage: logo,
  fontBase:
    "Inter, -apple-system, 'system-ui', 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  fontCode: "Monaco, Consolas, 'Lucida Console', monospace"
});
