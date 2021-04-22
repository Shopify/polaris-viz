import tokens from '@shopify/polaris-tokens';

import {Color} from '../types';

import {vizColors} from './viz-colors';

const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] = Object.keys(vizColors).concat(
  polarisTokensColors,
);

export const primaryColor = colorOptions[0] as Color;
export const secondaryColor = colorOptions[1] as Color;
