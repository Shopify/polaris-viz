// Inspired by: https://github.com/Shopify/web/blob/master/.storybook/theme.ts
import {create} from '@storybook/theming';
import logo from './polaris-viz-logo.svg';

const mainColor = 'rgb(0, 128, 96)';
const background = 'rgb(246, 246, 247)';
const border = 'rgb(201, 204, 207)';
const textColor = 'rgb(32, 34, 35)';
const inverseText = 'rgb(227, 229, 231)';
const mutedText = 'rgb(109, 113, 117)';
const inputBorder = 'rgb(140, 145, 150)';

export default create({
  base: 'light',

  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',
  brandImage: logo,

  colorPrimary: mainColor,
  colorSecondary: mainColor,

  // UI
  appBg: background,
  appContentBg: 'white',
  appBorderColor: border,
  appBorderRadius: 4,

  // Typography
  fontBase:
    "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  fontCode: "Monaco, Consolas, 'Lucida Console', monospace",

  // Text colors
  textColor,
  textInverseColor: inverseText,
  textMutedColor: mutedText,

  // Toolbar default and active colors
  barTextColor: textColor,
  barSelectedColor: mainColor,
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: inputBorder,
  inputTextColor: textColor,
  inputBorderRadius: 4,
});
