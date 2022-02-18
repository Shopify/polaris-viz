import type {StackedBarGapDirections} from '../../types';
import {getGapForIndex} from '../get-gap-for-index';

const GAPS: StackedBarGapDirections = {
  negative: [],
  positive: [
    {index: 0, gap: 0},
    {index: 1, gap: 2},
    {index: 2, gap: 4},
  ],
};

describe('getGapForIndex()', () => {
  it('returns gap for provided index', () => {
    expect(
      getGapForIndex({
        gaps: GAPS,
        direction: 'positive',
        seriesIndex: 1,
      }),
    ).toStrictEqual(2);
  });

  it('returns 0 when no gap can be found', () => {
    expect(
      getGapForIndex({
        gaps: GAPS,
        direction: 'negative',
        seriesIndex: 5,
      }),
    ).toStrictEqual(0);
  });
});
