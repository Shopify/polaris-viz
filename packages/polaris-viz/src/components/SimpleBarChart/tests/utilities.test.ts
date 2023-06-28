import type {SimpleBarChartDataSeries} from '../types';
import {getLongestTrendIndicator} from '../utilities';

const positiveValues = [
  {value: 1, key: 'Label 01'},
  {value: 2, key: 'Label 02'},
  {value: 3, key: 'Label 03'},
];

const negativeValues = [
  {value: -1, key: 'Label 01'},
  {value: -2, key: 'Label 02'},
  {value: -3, key: 'Label 03'},
];

const highestPositive = 3;
const lowestNegative = -3;

const trends = {
  '0': {
    value: '77%',
    trend: 'positive',
    direction: 'upward',
  },
  '2': {
    value: '907%',
    trend: 'negative',
    direction: 'downward',
  },
};

const positiveSeries = {
  name: 'Test',
  data: positiveValues,
  metadata: {
    trends,
  },
} as SimpleBarChartDataSeries;

const negativeSeries = {
  ...positiveSeries,
  data: negativeValues,
};

describe('getLongestTrendIndicator()', () => {
  it('returns a value for positive when the highest positive value has a trend indicator', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [positiveSeries],
      highestPositive,
      0,
    );

    expect(positive).toBeGreaterThan(0);
    expect(negative).toBe(0);
  });

  it('returns a value for negative when the lowest negative value has a trend indicator', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [negativeSeries],
      0,
      lowestNegative,
    );

    expect(positive).toBe(0);
    expect(negative).toBeGreaterThan(0);
  });

  it('returns values for both positive and negative when both the highest positive and lowest negative values have trend indicators', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [positiveSeries, negativeSeries],
      highestPositive,
      lowestNegative,
    );

    expect(positive).toBeGreaterThan(0);
    expect(negative).toBeGreaterThan(0);
  });

  it('returns 0 for positive when a lower value has a trend indicator but the highest positive value does not', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [
        {
          ...positiveSeries,
          metadata: {
            trends: {
              '0': trends['0'],
            },
          },
        } as SimpleBarChartDataSeries,
      ],
      highestPositive,
      0,
    );

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });

  it('returns 0 for negative when a higher value has a trend indicator but the lowest negative value does not', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [
        {
          ...negativeSeries,
          metadata: {
            trends: {
              '0': trends['0'],
            },
          },
        } as SimpleBarChartDataSeries,
      ],
      0,
      lowestNegative,
    );

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });

  it('returns 0 for both values if there are no trend indicators', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [
        {
          ...positiveSeries,
          metadata: {},
        },
      ],
      highestPositive,
      0,
    );

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });

  it('returns 0 for both values if metadata property is not present', () => {
    const {positive, negative} = getLongestTrendIndicator(
      [
        {
          ...positiveSeries,
          metadata: undefined,
        },
      ],
      highestPositive,
      0,
    );

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });
});
