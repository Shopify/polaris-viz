import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {BarChartProps} from '../BarChart';

import {Template} from './data';

export const MaxSeries: StoryFn<BarChartProps> = Template.bind({});

MaxSeries.args = {
  data: generateMultipleSeries(8),
  maxSeries: 4,
  renderBucketLegendLabel: () => 'Other Group',
};

export default {META, title: 'polaris-viz/Charts/BarChart/MaxSeries'} as any;