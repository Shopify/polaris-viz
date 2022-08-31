import React from 'react';
import type {Story} from '@storybook/react';

import {LineChart, LineChartProps} from '../../LineChart';
import {randomNumber} from '../../../Docs/utilities';
import {formatLinearXAxisLabel} from '../../../../storybook/utilities';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

const HOURLY_DATA = [
  {
    name: 'Hourly Data',
    data: Array(743)
      .fill(null)
      .map((_, index) => {
        return {
          key: new Date(2021, 1, 1, index).toISOString(),
          value: randomNumber(0, 400),
        };
      }),
  },
];

export const LargeDataSet: Story<LineChartProps> = Template.bind({});

LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
};

export const BadData: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <LineChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};
