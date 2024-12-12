import React, {useState} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import type {BarChartProps} from '../BarChart';
import {BarChart} from '../BarChart';

export const Template: Story<BarChartProps> = (args: BarChartProps) => {
  const [firstValNegative, setFirstValNegative] = useState(false);
  const data = [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: firstValNegative ? -20 : 3},
        {key: 'Tuesday', value: firstValNegative ? -100 : 50},
        {key: 'Wednesday', value: firstValNegative ? 100 : 3},
        {key: 'Thursday', value: 8},
        {key: 'Friday', value: 50},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0.1},
      ],
    },
  ];

  return (
    <React.Fragment>
      <button onClick={() => setFirstValNegative(!firstValNegative)}>change data</button>
      <BarChart {...args} data={data} />
    </React.Fragment>
  );
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 45},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];
