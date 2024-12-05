import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';
import {PolarisVizProvider} from '../../PolarisVizProvider/PolarisVizProvider';
import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS} from './data';

const TruncatedLegendsTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <div style={{width: 550, height: 200}}>
      <PolarisVizProvider>
        <DonutChart {...args} />
      </PolarisVizProvider>
    </div>
  );
};

export const TruncatedLegends: Story<DonutChartProps> = TruncatedLegendsTemplate.bind({});

TruncatedLegends.args = {
  ...DEFAULT_PROPS,
  showLegendValues: true,
  legendPosition: 'right',
  legendFullWidth: false,
  labelFormatter: (value) => `$${value}`,
  isAnimated: false,
  data: [
    {
      name: 'This is a long name that will get truncated',
      data: [{key: 'april - march', value: 50000}],
      metadata: {
        trend: {
          value: '5%',
        },
      },
    },
    {
      name: 'This is another long name that will get truncated',
      data: [{key: 'april - march', value: 250000}],
      metadata: {
        trend: {
          value: '50%',
          direction: 'downward',
          trend: 'negative',
        },
      },
    },
    {
      name: 'This is the last long name that will get truncated',
      data: [{key: 'april - march', value: 10000}],
      metadata: {
        trend: {
          value: '100%',
          direction: 'upward',
          trend: 'positive',
        },
      },
    },
  ],
};
