import type {Story} from '@storybook/react';

import {StackedAreaChart} from '../../StackedAreaChart';
import type {StackedAreaChartProps} from '../../StackedAreaChart';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA = [
  {
    name: 'Jul 8–Jul 11, 2024',
    data: [
      {
        key: 'Mon Jul 08 2024 00:00:00 GMT-0500 (Central Daylight Time)',
        value: 309.862,
      },
      {
        key: 'Tue Jul 09 2024 00:00:00 GMT-0500 (Central Daylight Time)',
        value: 367.701,
      },
      {
        key: 'Wed Jul 10 2024 00:00:00 GMT-0500 (Central Daylight Time)',
        value: 66.938,
      },
      {
        key: 'Thu Jul 11 2024 00:00:00 GMT-0500 (Central Daylight Time)',
        value: 344.069,
      },
    ],
  },
  {
    isComparison: true,
    name: 'Jul 7–Jul 13, 2024',
    data: [
      {
        key: 'Jul 07, 2024',
        value: 156.146,
      },
      {
        key: 'Jul 08, 2024',
        value: 309.862,
      },
      {
        key: 'Jul 09, 2024',
        value: 367.701,
      },
      {
        key: 'Jul 10, 2024',
        value: 66.938,
      },
      {
        key: 'Jul 11, 2024',
        value: 344.069,
      },
      {
        key: 'Jul 12, 2024',
        value: 286.229,
      },
      {
        key: 'Jul 13, 2024',
        value: 66.912,
      },
    ],
  },
];

const Template: Story<StackedAreaChartProps> = () => {
  return <StackedAreaChart data={DATA} isAnimated={false} />;
};

export const LongerComparison = Template.bind({});
