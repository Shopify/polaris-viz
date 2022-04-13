import type {TooltipData} from '@shopify/polaris-viz/src/components';
import {PolarisVizDefaultTheme} from '@shopify/polaris-viz';

import {TooltipRowType} from '../../../packages/polaris-viz/src/components/TooltipContent';

export const DATA: TooltipData[] = [
  {color: 'red', label: 'Product 1', value: '$0'},
  {color: 'purple', label: 'Product 2', value: '$10'},
];

export const WITH_ANNOTATIONS: TooltipData[] = [
  {
    color: PolarisVizDefaultTheme.seriesColors.upToFour[0],
    label: 'Breakfast',
    value: '-7',
  },
  {
    color: PolarisVizDefaultTheme.seriesColors.upToFour[1],
    label: 'Lunch',
    value: '0',
  },
  {
    color: 'purple',
    label: 'Median',
    value: '1.5 hours',
    type: TooltipRowType.Annotation,
  },
  {
    color: PolarisVizDefaultTheme.seriesColors.upToFour[2],
    label: 'Dinner',
    value: '0',
  },
];
