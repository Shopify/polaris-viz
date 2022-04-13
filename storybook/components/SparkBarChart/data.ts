import type {DataSeries} from '@shopify/polaris-viz-core';

const COMPARISON_VALUE = 2000;

export const DATA: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 100},
      {key: 6, value: 2000},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
  {
    data: [
      {key: 0, value: COMPARISON_VALUE},
      {key: 1, value: COMPARISON_VALUE},
      {key: 2, value: COMPARISON_VALUE},
      {key: 3, value: COMPARISON_VALUE},
      {key: 4, value: COMPARISON_VALUE},
      {key: 5, value: COMPARISON_VALUE},
      {key: 6, value: COMPARISON_VALUE},
      {key: 7, value: COMPARISON_VALUE},
      {key: 8, value: COMPARISON_VALUE},
      {key: 9, value: COMPARISON_VALUE},
      {key: 10, value: COMPARISON_VALUE},
    ],
    isComparison: true,
  },
];

export const OFFSET_AND_NULLS: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: -300},
      {key: 3, value: null},
      {key: 4, value: 400},
      {key: 5, value: 0},
      {key: 6, value: 0},
      {key: 7, value: 400},
      {key: 8, value: 700},
      {key: 9, value: 900},
      {key: 10, value: 500},
    ],
  },
  {
    data: [
      {key: 0, value: COMPARISON_VALUE},
      {key: 1, value: COMPARISON_VALUE},
      {key: 2, value: COMPARISON_VALUE},
      {key: 3, value: COMPARISON_VALUE},
      {key: 4, value: COMPARISON_VALUE},
      {key: 5, value: COMPARISON_VALUE},
      {key: 6, value: COMPARISON_VALUE},
      {key: 7, value: COMPARISON_VALUE},
      {key: 8, value: COMPARISON_VALUE},
      {key: 9, value: COMPARISON_VALUE},
      {key: 10, value: COMPARISON_VALUE},
    ],
    isComparison: true,
  },
];

export const OVERWRITTEN_SERIES_COLORS: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: -300},
      {key: 3, value: null},
      {key: 4, value: 400},
      {key: 5, value: 0},
      {key: 6, value: 0},
      {key: 7, value: 400},
      {key: 8, value: 700},
      {key: 9, value: 900},
      {key: 10, value: 500},
    ],
    color: 'lime',
  },
  {
    data: [
      {key: 0, value: COMPARISON_VALUE},
      {key: 1, value: COMPARISON_VALUE},
      {key: 2, value: COMPARISON_VALUE},
      {key: 3, value: COMPARISON_VALUE},
      {key: 4, value: COMPARISON_VALUE},
      {key: 5, value: COMPARISON_VALUE},
      {key: 6, value: COMPARISON_VALUE},
      {key: 7, value: COMPARISON_VALUE},
      {key: 8, value: COMPARISON_VALUE},
      {key: 9, value: COMPARISON_VALUE},
      {key: 10, value: COMPARISON_VALUE},
    ],
    isComparison: true,
  },
];
