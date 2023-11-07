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

  it('loops through a large data set in less than 15ms', () => {
    const data = getData();

    const start = Date.now();
    fillMissingDataPoints(data);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(15);
  });
});

const DATA_SERIES_COUNT = 10;
const DATA_POINTS_COUNT = 500;

function getData() {
  const largestArray: DataSeries[] = [];

  for (let i = 1; i <= DATA_SERIES_COUNT; i++) {
    const dataItems: DataPoint[] = [];
    const randomOffset = getRandomNumber(0, DATA_POINTS_COUNT / 6);

    for (let j = 1; j <= DATA_POINTS_COUNT - randomOffset; j++) {
      const key = getRandomKey();
      const value = getRandomNumber(0, 100);
      dataItems.push({key, value});
    }

    largestArray.push({name: `Array ${i}`, data: dataItems});
  }

  return largestArray;

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomKey() {
    return Math.random().toString(36).substring(7);
  }
}
