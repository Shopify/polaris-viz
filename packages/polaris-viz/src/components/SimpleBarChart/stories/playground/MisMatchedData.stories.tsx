import type {Story} from '@storybook/react';

import {SimpleBarChart} from '../../SimpleBarChart';
import type {SimpleBarChartProps} from '../../SimpleBarChart';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

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

const Template: Story<SimpleBarChartProps> = () => {
  return (
    <div style={{height: 600, width: 800}}>
      <SimpleBarChart data={DATA} />
    </div>
  );
};

export const MisMatchedData = Template.bind({});
