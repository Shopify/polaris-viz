import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../../../components';

import {DEFAULT_PROPS, Template} from './data';

export const MultipleComparisons: Story<LineChartProps> = Template.bind({});

MultipleComparisons.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'One',
      data: [
        {value: 100, key: '2020-04-01T12:00:00'},
        {value: 200, key: '2020-04-02T12:00:00'},
        {value: 100, key: '2020-04-03T12:00:00'},
        {value: 200, key: '2020-04-04T12:00:00'},
      ],
      metadata: {
        comparisonIndex: 1,
      },
    },
    {
      name: 'One Comparison',
      data: [
        {value: 200, key: '2020-03-07T12:00:00'},
        {value: 100, key: '2020-03-06T12:00:00'},
        {value: 200, key: '2020-03-08T12:00:00'},
        {value: 100, key: '2020-03-09T12:00:00'},
      ],
      isComparison: true,
    },
    {
      name: 'Two',
      data: [
        {value: 400, key: '2020-04-11T12:00:00'},
        {value: 600, key: '2020-04-12T12:00:00'},
        {value: 400, key: '2020-04-13T12:00:00'},
        {value: 600, key: '2020-04-14T12:00:00'},
      ],
      metadata: {
        comparisonIndex: 3,
      },
    },
    {
      name: 'Two Comparison',
      data: [
        {value: 600, key: '2020-03-05T12:00:00'},
        {value: 400, key: '2020-03-07T12:00:00'},
        {value: 600, key: '2020-03-06T12:00:00'},
        {value: 400, key: '2020-03-08T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};
