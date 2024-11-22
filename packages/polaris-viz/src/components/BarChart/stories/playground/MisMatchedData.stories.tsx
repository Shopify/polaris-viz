import type {StoryFn} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../../components';
import {META} from '../meta';
import {DEFAULT_DATA as LINEAR_DATA} from '../../../LineChart/stories/data';

export default {
  ...META,
  title: 'polaris-viz/Charts/BarChart/Playground/MisMatchedData',
} as any;

const DATA = [
  {
    name: 'Canada',
    data: [
      {key: 'Mice', value: 13.28},
      {key: 'Dogs', value: 23.43},
      {key: 'Cats', value: 6.64},
      {key: 'Birds', value: 54.47},
    ],
  },
  {
    name: 'United States',
    data: [
      {key: 'Lizards', value: 350.13},
      {key: 'Turtles', value: 223.43},
      {key: 'Mice', value: 15.38},
      {key: 'Snakes', value: 122.68},
      {key: 'Dogs', value: 31.54},
      {key: 'Birds', value: 94.84},
    ],
  },
  {
    name: 'China',
    data: [
      {key: 'Snakes', value: 0},
      {key: 'Dogs', value: 0},
    ],
  },
];

const Template: StoryFn<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const MisMatchedData = Template.bind({});

MisMatchedData.args = {
  data: DATA,
};

const WEB_DATA = [
  {
    isComparison: false,
    name: 'Dec 16, 2023–Jan 14, 2024',
    data: [
      {
        key: 'Alabama',
        value: 59.94,
      },
      {
        key: 'Arizona',
        value: 408.02,
      },
      {
        key: 'Arkansas',
        value: 123.99,
      },
      {
        key: 'California',
        value: 1312.3,
      },
      {
        key: 'Colorado',
        value: 78.98,
      },
    ],
  },
  {
    isComparison: true,
    name: 'Nov 14–Dec 14, 2023',
    data: [
      {
        key: 'Arizona',
        value: 153.08,
      },
      {
        key: 'Arkansas',
        value: 69.98,
      },
      {
        key: 'California',
        value: 2498.59,
      },
      {
        key: 'Colorado',
        value: 211.97,
      },
    ],
  },
];

export const MisMatchedWebData = Template.bind({});

MisMatchedWebData.args = {
  data: WEB_DATA,
};

export const MisMatchedLinearData = Template.bind({});

MisMatchedLinearData.args = {
  data: LINEAR_DATA,
};
