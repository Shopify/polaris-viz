import type {Story} from '@storybook/react';

import type {LineChartProps} from '../../../../components';
import {META} from '../meta';
import {DEFAULT_PROPS, Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};


const DATA= [
  {
    "name": "Apr 1 – Apr 14, 2020",
    "data": [
      {
        "value": 8,
        "key": "2020-04-02T12:00:00"
      },
    ]
  },
  {
    "name": "May 1 – May 14, 2020",
    "data": [
      {
        "value": 10,
        "key": "2020-04-02T12:00:00"
      },
    ]
  },
  {
    "name": "Jun 1 – Jun 14, 2020",
    "data": [
      {
        "value": 15,
        "key": "2020-04-02T12:00:00"
      },
    ]
  },
]

export const CrosshairOffset: Story<LineChartProps> = Template.bind({});

CrosshairOffset.args = {
  ...DEFAULT_PROPS,
  data: DATA,
};
