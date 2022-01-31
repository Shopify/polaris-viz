import type {StackedBarGapDirections} from 'types';
import {scaleLinear} from 'd3-scale';

import {getYPosition} from '../get-y-position';

jest.mock('d3-scale', () => ({
  scaleLinear: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];
    scale.range = () => [0, 2];

    return scale;
  },
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
