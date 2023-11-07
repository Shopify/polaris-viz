import type {DataPoint, DataSeries} from '@shopify/polaris-viz-core';

import {fillMissingDataPoints} from '../fillMissingDataPoints';

describe('fillMissingDataPoints', () => {
  it('returns original data when each array length matches', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Snakes', value: 122.68},
          {key: 'Dogs', value: 31.54},
        ],
      },
      {
        name: 'United States',
        data: [
          {key: 'Snakes', value: 122.68},
          {key: 'Dogs', value: 31.54},
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
    const result = fillMissingDataPoints(mockData);
    expect(result).toMatchObject(mockData);
  });

  it('fills data so all arrays contain all items', () => {
    const mockData = [
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

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject([
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
          {key: 'Lizards', value: null},
          {key: 'Turtles', value: null},
          {key: 'Snakes', value: null},
        ],
      },
      {
        name: 'United States',
        data: [
          {key: 'Mice', value: 15.38},
          {key: 'Dogs', value: 31.54},
          {key: 'Cats', value: null},
          {key: 'Birds', value: 94.84},
          {key: 'Lizards', value: 350.13},
          {key: 'Turtles', value: 223.43},
          {key: 'Snakes', value: 122.68},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Mice', value: null},
          {key: 'Dogs', value: 0},
          {key: 'Cats', value: null},
          {key: 'Birds', value: null},
          {key: 'Lizards', value: null},
          {key: 'Turtles', value: null},
          {key: 'Snakes', value: 0},
        ],
      },
    ]);
  });
});
