import type {DataSeries} from '@shopify/polaris-viz-core';

export const DATA: DataSeries[] = [
  {
    name: 'First-time',
    data: [
      {key: 'January', value: 4237},
      {key: 'February', value: 5024},
      {key: 'March', value: 5730},
      {key: 'April', value: 5587},
      {key: 'May', value: 5303},
      {key: 'June', value: 5634},
      {key: 'July', value: 3238},
    ],
  },
  {
    name: 'Returning',
    data: [
      {key: 'January', value: 5663},
      {key: 'February', value: 7349},
      {key: 'March', value: 9795},
      {key: 'April', value: 7396},
      {key: 'May', value: 7028},
      {key: 'June', value: 12484},
      {key: 'July', value: 4878},
    ],
  },
];

export const OVERWRITTEN_SERIES_COLORS: DataSeries[] = [
  {
    name: 'One',
    data: Array(5)
      .fill(null)
      .map(() => {
        return {
          value: Math.random() * Math.random() * 100,
          key: Math.random().toString(),
        };
      }),
    color: 'lime',
  },
  {
    name: 'Two',
    data: Array(5)
      .fill(null)
      .map(() => {
        return {
          value: Math.random() * Math.random() * 100,
          key: Math.random().toString(),
        };
      }),
  },
];
