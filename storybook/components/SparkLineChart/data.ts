import type {DataSeries} from '@shopify/polaris-viz-core';

export const DATA: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 1000},
      {key: 6, value: 200},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
  {
    isComparison: true,
    data: [
      {key: 0, value: 200},
      {key: 1, value: 200},
      {key: 2, value: 200},
      {key: 3, value: 200},
      {key: 4, value: 200},
      {key: 5, value: 200},
      {key: 6, value: 200},
      {key: 7, value: 200},
      {key: 8, value: 200},
      {key: 9, value: 200},
      {key: 10, value: 200},
    ],
  },
];

export const OFFSET_AND_NULLS: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 50},
      {key: 2, value: null},
      {key: 3, value: 200},
      {key: 4, value: 400},
      {key: 5, value: 1000},
      {key: 6, value: 200},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 100},
    ],
  },
  {
    isComparison: true,
    data: [
      {key: 0, value: 20},
      {key: 1, value: 20},
      {key: 2, value: 20},
      {key: 3, value: 20},
      {key: 4, value: 20},
      {key: 5, value: 20},
      {key: 6, value: 20},
      {key: 7, value: 20},
      {key: 8, value: 20},
      {key: 9, value: 20},
      {key: 10, value: 20},
    ],
  },
];

export const OVERWRITTEN_SERIES_COLORS: DataSeries[] = [
  {
    isComparison: true,
    data: [
      {key: 0, value: 200},
      {key: 1, value: 200},
      {key: 2, value: 200},
      {key: 3, value: 200},
      {key: 4, value: 200},
      {key: 5, value: 200},
      {key: 6, value: 200},
      {key: 7, value: 200},
      {key: 8, value: 200},
      {key: 9, value: 200},
      {key: 10, value: 200},
    ],
  },
  {
    color: 'lime',
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 1000},
      {key: 6, value: 200},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
];

export const ZERO_SERIES: DataSeries[] = [
  {
    isComparison: true,
    data: [
      {key: 0, value: 200},
      {key: 1, value: 200},
      {key: 2, value: 200},
      {key: 3, value: 200},
      {key: 4, value: 200},
      {key: 5, value: 200},
      {key: 6, value: 200},
      {key: 7, value: 200},
      {key: 8, value: 200},
      {key: 9, value: 200},
      {key: 10, value: 200},
    ],
  },
  {
    data: [
      {key: 0, value: 0},
      {key: 1, value: 0},
      {key: 2, value: 0},
      {key: 3, value: 0},
      {key: 4, value: 0},
      {key: 5, value: 0},
      {key: 6, value: 0},
      {key: 7, value: 0},
      {key: 8, value: 0},
      {key: 9, value: 0},
      {key: 10, value: 0},
    ],
  },
];
