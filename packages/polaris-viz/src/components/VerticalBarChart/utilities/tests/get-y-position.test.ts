import type {StackedBarGapDirections} from '@shopify/polaris-viz-core';
import {scaleLinear} from 'd3-scale';

import {getYPosition} from '../get-y-position';

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

describe('getYPosition()', () => {
  it('returns position for positive', () => {
    expect(
      getYPosition({
        start: 0,
        end: 7,
        groupIndex: 1,
        gaps: GAPS,
        yScale: scaleLinear(),
      }),
    ).toStrictEqual(5);
  });

  it('returns position for negative', () => {
    expect(
      getYPosition({
        start: -7,
        end: 0,
        groupIndex: 1,
        gaps: GAPS,
        yScale: scaleLinear(),
      }),
    ).toStrictEqual(2);
  });
});
