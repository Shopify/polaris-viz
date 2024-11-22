import type {StoryFn} from '@storybook/react';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

import {META} from './meta';

export const MaxSeries: StoryFn<DonutChartProps> = Template.bind({});

MaxSeries.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(16, 'dates', 1),
  maxSeries: 4,
  renderBucketLegendLabel: () => 'Other Group',
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/MaxSeries'} as any;