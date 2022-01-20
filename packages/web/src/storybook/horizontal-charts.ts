import type {DataSeries, DataPoint} from '../types';

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];
const GROUPS = [
  'Womens Leggings',
  'Mens Bottoms',
  'Mens Shorts',
  'Socks',
  'Hats',
  'Ties',
];

export function buildSeries(
  items: number[] | number[][],
  labels: string[] = LABELS,
): DataSeries[] {
  return labels.map((name, index) => {
    const data = GROUPS.map((name, groupIndex) => {
      const item = items[groupIndex];
      const array = Array.isArray(item) ? item : [item];

      if (array[index] == null) {
        return false;
      }

      return {
        key: name,
        value: array[index],
      };
    });

    return {
      name,
      data: data.filter(Boolean) as DataPoint[],
    };
  });
}

export const SERIES = buildSeries([
  [3, 4, 7],
  [0, 0, 0],
  [4, 5, 6],
  [8, 15, 12],
  [48, 8, 50],
  [1, 5, 5],
]);

export const SINGLE_SERIES = buildSeries(
  [[3], [0], [4], [8], [48], [1]],
  [LABELS[0]],
);

export const COMPARISON_SERIES = [
  {
    name: 'BCFM 2019',
    data: [
      {
        key: 'Womens Leggings',
        value: 3,
      },
      {
        key: 'Mens Bottoms',
        value: 7,
      },
      {
        key: 'Mens Shorts',
        value: 4,
      },
    ],
  },
  {
    name: 'BCFM 2020',
    data: [
      {
        key: 'Womens Leggings',
        value: 4,
      },
      {
        key: 'Mens Bottoms',
        value: 2,
      },
      {
        key: 'Mens Shorts',
        value: 5,
      },
    ],
    isComparison: true,
  },
];

export const COLOR_OVERRIDE_SERIES = [
  {
    name: 'Shirt',
    data: [
      {value: 4, key: 'Yesterday'},
      {value: 7, key: 'Today'},
    ],
    color: 'lime',
  },
  {
    name: 'Pants',
    data: [
      {value: 5, key: 'Yesterday'},
      {value: 6, key: 'Today'},
    ],
  },
  {
    name: 'Shoes',
    data: [
      {value: 15, key: 'Yesterday'},
      {value: 12, key: 'Today'},
    ],
  },
];
