import type {Story} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../../StackedAreaChart';
import {formatHourlyLabel} from '../../../../storybook/utilities';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return (
    <div style={{height: 400}}>
      <StackedAreaChart {...args} />
    </div>
  );
};

export const WebData = Template.bind({});

WebData.args = {
  xAxisOptions: {
    labelFormatter: formatHourlyLabel,
  },
  data: [
    {
      data: [
        {
          value: 0,
          key: '2022-03-23T00:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T01:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T02:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T03:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T04:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T05:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T06:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T07:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T08:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T09:00:00-04:00',
        },
        {
          value: 3,
          key: '2022-03-23T10:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T11:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T12:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T13:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T14:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T15:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T16:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T17:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T18:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T19:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T20:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T21:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T22:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T23:00:00-04:00',
        },
      ],
      name: 'First-time',
    },
    {
      data: [
        {
          value: 0,
          key: '2022-03-23T00:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T01:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T02:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T03:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T04:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T05:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T06:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T07:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T08:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T09:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T10:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T11:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T12:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T13:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T14:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T15:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T16:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T17:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T18:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T19:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T20:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T21:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T22:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T23:00:00-04:00',
        },
      ],
      name: 'Returning',
    },
  ],
};

export const NonAnimatedSmallData: Story<StackedAreaChartProps> = Template.bind(
  {},
);
NonAnimatedSmallData.args = {
  data: [
    {
      name: 'Impressions',
      data: [
        {key: '2022-07-10', value: 1},
        {key: '2022-07-11', value: 0},
        {key: '2022-07-12', value: 0},
      ],
    },
    {
      name: 'Conversions',
      data: [
        {key: '2022-07-10', value: 0},
        {key: '2022-07-11', value: 0},
        {key: '2022-07-12', value: 0},
      ],
    },
  ],
  isAnimated: false,
};

export const BadData: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return (
    <div style={{width: 600, height: 400}}>
      <StackedAreaChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};

export const TicksOverride: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};

TicksOverride.args = {
  data: [
    {
      name: 'Impressions',
      data: [
        {key: '2022-07-10', value: 20},
        {key: '2022-07-11', value: 34},
        {key: '2022-07-12', value: 15},
      ],
    },
    {
      name: 'Conversions',
      data: [
        {key: '2022-07-10', value: 13},
        {key: '2022-07-11', value: 76},
        {key: '2022-07-12', value: 20},
      ],
    },
  ],
  yAxisOptions: {
    maxYOverride: 100,
    ticksOverride: [0, 10, 20, 40, 70],
  },
};

export const LegendPosition = Template.bind({});

LegendPosition.args = {
  data: [
    {
      name: 'Impressions',
      data: [
        {key: '2022-07-10', value: 20},
        {key: '2022-07-11', value: 34},
        {key: '2022-07-12', value: 15},
      ],
    },
    {
      name: 'Conversions',
      data: [
        {key: '2022-07-10', value: 13},
        {key: '2022-07-11', value: 76},
        {key: '2022-07-12', value: 20},
      ],
    },
  ],
  legendPosition: 'left',
};
