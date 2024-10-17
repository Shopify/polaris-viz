import type {Story} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../../../../components';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA = [
  {
    name: 'NULL',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
    ],
  },
  {
    name: 'Biltong Taster Pack',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: Infinity,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 123.99,
      },
    ],
  },
];

const Template: Story<StackedAreaChartProps> = () => {
  return <StackedAreaChart data={DATA} isAnimated={false} />;
};

export const InfinityState = Template.bind({});
