// Inspired by: https://github.com/Shopify/web/blob/master/.storybook/theme.ts
import {create} from '@storybook/theming';
import {fontStackBase, fontStackMonospace} from '@shopify/polaris-tokens';
import colors from '@shopify/polaris-tokens/dist-modern/palette/base.light.json';
import darkColors from '@shopify/polaris-tokens/dist-modern/palette/base.dark.json';

export default create({
  base: 'light',

  brandTitle: 'Polaris-Viz',
  brandUrl: 'https://github.com/Shopify/polaris-viz',

  colorPrimary: colors.actionPrimary,
  colorSecondary: colors.actionPrimary,

  // UI
  appBg: colors.background,
  appContentBg: colors.surface,
  appBorderColor: colors.borderSubdued,
  appBorderRadius: 4,

  // Typography
  fontBase: fontStackBase,
  fontCode: fontStackMonospace,

  // Text colors
  textColor: colors.text,
  textInverseColor: darkColors.text,
  textMutedColor: colors.textSubdued,

  // Toolbar default and active colors
  barTextColor: colors.text,
  barSelectedColor: colors.actionPrimary,
  barBg: colors.surface,

  // Form colors
  inputBg: colors.surface,
  inputBorder: colors.border,
  inputTextColor: colors.text,
  inputBorderRadius: 4,
});
