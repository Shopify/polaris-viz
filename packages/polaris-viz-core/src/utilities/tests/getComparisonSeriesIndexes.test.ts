import {getComparisonSeriesIndexes} from '../getComparisonSeriesIndexes';

describe('getComparisonSeriesIndexes', () => {
  it('returns empty array when no comparison indexes exist', () => {
    const data = [
      {value: 10, metadata: {}},
      {value: 20, metadata: null},
      {value: 30},
    ];

    const result = getComparisonSeriesIndexes(data);
    expect(result).toStrictEqual([]);
  });

  it('returns array of comparison series indexes when they exist', () => {
    const data = [
      {value: 10, metadata: {comparisonIndex: 2}},
      {value: 20, metadata: {comparisonIndex: 3}},
      {value: 30, metadata: {}},
      {value: 40, metadata: {}},
    ];

    const result = getComparisonSeriesIndexes(data);
    expect(result).toStrictEqual([
      {originalIndex: 0, comparisonIndex: 2},
      {originalIndex: 1, comparisonIndex: 3},
    ]);
  });

  it('handles mixed data with some comparison indexes', () => {
    const data = [
      {value: 10, metadata: {comparisonIndex: 1}},
      {value: 20, metadata: {}},
      {value: 30, metadata: {comparisonIndex: 3}},
      {value: 40},
    ];

    const result = getComparisonSeriesIndexes(data);
    expect(result).toStrictEqual([
      {originalIndex: 0, comparisonIndex: 1},
      {originalIndex: 2, comparisonIndex: 3},
    ]);
  });

  it('handles zero as a valid comparison index', () => {
    const data = [
      {value: 10, metadata: {comparisonIndex: 0}},
      {value: 20, metadata: {}},
    ];

    const result = getComparisonSeriesIndexes(data);
    expect(result).toStrictEqual([{originalIndex: 0, comparisonIndex: 0}]);
  });
});
