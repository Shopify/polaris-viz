import tokens from '@shopify/polaris-tokens';

import {vizColors} from '../utilities';

export const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] =
  Object.keys(vizColors).concat(polarisTokensColors);

export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};
