import type {Story} from '@storybook/react';

import {
  LineChartPredictive,
  LineChartPredictiveProps,
} from '../../../../components';
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
        value: Infinity,
      },
    ],
  },
];

const Template: Story<LineChartPredictiveProps> = () => {
  return <LineChartPredictive data={DATA} isAnimated={false} />;
};

export const InfinityState = Template.bind({});
