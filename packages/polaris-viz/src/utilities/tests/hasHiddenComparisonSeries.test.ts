import {hasHiddenComparisonSeries} from '../hasHiddenComparisonSeries';

describe('hasHiddenComparisonSeries()', () => {
  it('returns false if the comparison series indexes are empty', () => {
    const result = hasHiddenComparisonSeries({
      activeColorVisionIndex: 0,
      comparisonSeriesIndexes: [],
      index: 0,
    });
    expect(result).toBe(false);
  });

  it('returns false if the comparison series index is not found', () => {
    const result = hasHiddenComparisonSeries({
      activeColorVisionIndex: 0,
      comparisonSeriesIndexes: [{originalIndex: 0, comparisonIndex: 1}],
      index: 2,
    });
    expect(result).toBe(false);
  });

  it('returns true if the comparisonIndex matches index and originalIndex is not the same as the activeColorVisionIndex', () => {
    const result = hasHiddenComparisonSeries({
      activeColorVisionIndex: 0,
      comparisonSeriesIndexes: [{originalIndex: 1, comparisonIndex: 2}],
      index: 2,
    });

    expect(result).toBe(true);
  });

  it('returns false if the comparisonIndex matches index and originalIndex is the same as the activeColorVisionIndex', () => {
    const result = hasHiddenComparisonSeries({
      activeColorVisionIndex: 0,
      comparisonSeriesIndexes: [{originalIndex: 0, comparisonIndex: 2}],
      index: 2,
    });
    expect(result).toBe(false);
  });

  it('returns false if the comparisonIndex does not match index', () => {
    const result = hasHiddenComparisonSeries({
      activeColorVisionIndex: 0,
      comparisonSeriesIndexes: [{originalIndex: 1, comparisonIndex: 2}],
      index: 1,
    });
    expect(result).toBe(false);
  });
});
