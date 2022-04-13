import type {DataSeries} from '@shopify/polaris-viz-core';

export const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 50},
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
      {key: 'Saturday', value: 50},
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
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

export const DATA_WITH_COLOR: DataSeries[] = [
  {
    name: 'Breakfast',
    color: 'lime',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: 8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 5},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 6},
      {key: 'Thursday', value: 12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];
