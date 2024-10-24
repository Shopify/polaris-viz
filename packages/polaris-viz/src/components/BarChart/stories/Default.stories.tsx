import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<BarChartProps> = Template.bind({});

const data = [
  {
    name: 'Monday',
    data: [
      {key: 'Breakfast', value: 3},
      {key: 'Lunch', value: 4},
      {key: 'Dinner', value: 7},
    ],
  },
  {
    name: 'Tuesday',
    data: [
      {key: 'Lunch', value: 14},
      {key: 'Dinner', value: 17},
    ],
    color: 'red',
  },
  {
    name: 'Wednesday',
    data: [
      {key: 'Breakfast', value: 23},
      {key: 'Dinner', value: 27},
    ],
  },
  {
    name: 'Thursday',
    data: [
      {key: 'Breakfast', value: 33},
      {key: 'Lunch', value: 34},
    ],
  },
];

function formatData(data) {
  const keys = new Set();

  for (const series of data) {
    for (const {key} of series.data) {
      keys.add(key);
    }
  }

  return [...keys].map((key, index) => {
    return {
      ...data[index],
      name: key,
      data: data.map((series) => {
        const values = series.data.find((d) => d.key === key);

        return {key: series.name ?? '', value: values?.value ?? 0};
      }),
    };
  });
}

Default.args = {
  data: formatData(data),
  onError: (a, b) => {
    console.log({a, b});
  },
};
