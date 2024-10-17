import {META} from '../meta';
import {Template} from '../data';
import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Charts/LineChartRelational/Playground',
};

import type {LineChartRelationalProps} from '../../LineChartRelational';

export const InfinityState: Story<LineChartRelationalProps> = Template.bind({});

InfinityState.args = {
  data: [
    {
      name: 'Average',
      data: [
        {value: 333, key: '2020-03-01T12:00:00'},
        {value: Infinity, key: '2020-03-02T12:00:00'},
      ],
      color: 'orange',
    },
    {
      name: '75th Percentile',
      data: [
        {value: 388, key: '2020-03-01T12:00:00'},
        {value: 859, key: '2020-03-02T12:00:00'},
      ],
      color: 'blue',
      metadata: {
        relatedIndex: 2,
      },
    },
    {
      name: 'Median',
      data: [
        {value: 238, key: '2020-03-01T12:00:00'},
        {value: 759, key: '2020-03-02T12:00:00'},
      ],
      color: 'green',
    },
    {
      name: '25th percentile',
      data: [
        {value: 88, key: '2020-03-01T12:00:00'},
        {value: 559, key: '2020-03-02T12:00:00'},
      ],
      color: 'red',
      metadata: {
        relatedIndex: 2,
      },
    },
  ],
};
