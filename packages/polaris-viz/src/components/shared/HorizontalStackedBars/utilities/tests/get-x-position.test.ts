import type {StackedBarGapDirections} from 'types';
import {scaleLinear} from 'd3-scale';

import {getXPosition} from '../get-x-position';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const GAPS: StackedBarGapDirections = {
  negative: [
    {index: 0, gap: 0},
    {index: 1, gap: 2},
  ],
  positive: [
    {index: 0, gap: 0},
    {index: 1, gap: 2},
  ],
};

describe('getXPosition()', () => {
  it('returns position for positive', () => {
    expect(
      getXPosition({
        start: 0,
        end: 7,
        seriesIndex: 1,
        gaps: GAPS,
        xScale: scaleLinear(),
      }),
    ).toStrictEqual(2);
  });

  it('returns position for negative', () => {
    expect(
      getXPosition({
        start: -7,
        end: 0,
        seriesIndex: 1,
        gaps: GAPS,
        xScale: scaleLinear(),
      }),
    ).toStrictEqual(-9);
  });
});
