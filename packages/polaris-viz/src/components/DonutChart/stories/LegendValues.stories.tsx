import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';

import {DonutChart} from '..';
import type {DonutChartProps} from '..';

import {DEFAULT_PROPS} from './data';

const data = [
  {
    name: 'Mobile',
    data: [
      {
        key: 'Mobile',
        value: 477,
      },
    ],
  },
  {
    name: 'Desktop',
    data: [
      {
        key: 'Desktop',
        value: 222,
      },
    ],
  },
  {
    name: 'Tablet',
    data: [
      {
        key: 'Tablet',
        value: 80,
      },
    ],
  },
];

const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <div style={{width: 550, height: 400}}>
      <DonutChart {...args} />
    </div>
  );
};

export const LegendValues: Story<DonutChartProps> = Template.bind({});

LegendValues.args = {
  ...DEFAULT_PROPS,
  data,
  legendPosition: 'right',
  showLegendValues: true,
};
