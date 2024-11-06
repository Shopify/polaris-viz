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
  it('returns a value for positive when positive values have a trend indicator', () => {
    const {positive, negative} = getLongestTrendIndicator([positiveSeries]);

    expect(positive).toStrictEqual(53);
    expect(negative).toBe(0);
  });

  it('returns a value for negative when negative values have a trend indicator', () => {
    const {positive, negative} = getLongestTrendIndicator([negativeSeries]);

    expect(positive).toBe(0);
    expect(negative).toStrictEqual(53);
  });

  it('returns values for both positive and negative when positive and negative values have trend indicators', () => {
    const {positive, negative} = getLongestTrendIndicator([
      positiveSeries,
      negativeSeries,
    ]);

    expect(positive).toStrictEqual(53);
    expect(negative).toStrictEqual(53);
  });

  it('returns 0 for both values if there are no trend indicators', () => {
    const {positive, negative} = getLongestTrendIndicator([
      {
        ...positiveSeries,
        metadata: {},
      },
    ]);

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });

  it('returns 0 for both values if metadata property is not present', () => {
    const {positive, negative} = getLongestTrendIndicator([
      {
        ...positiveSeries,
        metadata: undefined,
      },
    ]);

    expect(positive).toBe(0);
    expect(negative).toBe(0);
  });
});
