import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import type {StackedAreaChartProps} from '../StackedAreaChart';
import {StackedAreaChart} from '../StackedAreaChart';
import {formatLinearYAxisLabel} from '../../../storybook/utilities';

export const DEFAULT_PROPS = {
  skipLinkText: 'Skip chart content',
  yAxisOptions: {labelFormatter: formatLinearYAxisLabel},
  isAnimated: true,
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'First-time',
    data: [
      {key: 'January', value: 4237},
      {key: 'February', value: 5024},
      {key: 'March', value: 5730},
      {key: 'April', value: 5587},
      {key: 'May', value: 5303},
      {key: 'June', value: 5634},
      {key: 'July', value: 3238},
    ],
  },
  {
    name: 'Returning',
    data: [
      {key: 'January', value: 5663},
      {key: 'February', value: 7349},
      {key: 'March', value: 9795},
      {key: 'April', value: 7396},
      {key: 'May', value: 22000},
      {key: 'June', value: 12484},
      {key: 'July', value: 4878},
    ],
  },
];

export const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return (
    <div style={{height: '500px'}}>
      <StackedAreaChart {...args} />
    </div>
  );
};
