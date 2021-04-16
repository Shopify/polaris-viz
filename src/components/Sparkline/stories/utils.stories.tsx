import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {BarChartTooltipContent} from '../../../components';
import {vizColors} from '../../../utilities';

const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] = Object.keys(vizColors).concat(
  polarisTokensColors,
);
