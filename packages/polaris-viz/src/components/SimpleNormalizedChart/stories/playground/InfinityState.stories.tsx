import type {Story} from '@storybook/react';

import type {SimpleNormalizedChartProps} from '../../../../components';

import {DEFAULT_PROPS, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const InfinityState: Story<SimpleNormalizedChartProps> = Template.bind(
  {},
);

InfinityState.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Instagram',
      data: [
        {
          key: 'April 2022',
          value: 200,
        },
      ],
    },
    {
      name: 'Facebook',
      data: [
        {
          key: 'April 2022',
          value: Infinity,
        },
      ],
    },
  ],
};
