import {formatDataIntoGroups} from '../formatDataIntoGroups';

const DATA = [
  {
    name: 'BCFM 2019',
    data: [
      {
        key: 'Womens Leggings',
        value: 3,
      },
      {
        key: 'Mens Bottoms',
        value: 0,
      },
      {
        key: 'Mens Shorts',
        value: 4,
      },
      {
        key: 'Socks',
        value: 8,
      },
      {
        key: 'Hats',
        value: 48,
      },
      {
        key: 'Ties',
        value: 1,
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
        value: 0,
      },
      {
        key: 'Mens Shorts',
        value: 5,
      },
      {
        key: 'Socks',
        value: 15,
      },
      {
        key: 'Hats',
        value: 8,
      },
      {
        key: 'Ties',
        value: 5,
      },
    ],
  },
  {
    name: 'BCFM 2021',
    data: [
      {
        key: 'Womens Leggings',
        value: 7,
      },
      {
        key: 'Mens Bottoms',
        value: 0,
      },
      {
        key: 'Mens Shorts',
        value: 6,
      },
      {
        key: 'Socks',
        value: 12,
      },
      {
        key: 'Hats',
        value: 50,
      },
      {
        key: 'Ties',
        value: 5,
      },
    ],
  },
];

describe('formatDataIntoGroups', () => {
  it('returns grouped values', () => {
    const groups = formatDataIntoGroups(DATA);
    expect(groups).toStrictEqual([
      [3, 4, 7],
      [0, 0, 0],
      [4, 5, 6],
      [8, 15, 12],
      [48, 8, 50],
      [1, 5, 5],
    ]);
  });
});
