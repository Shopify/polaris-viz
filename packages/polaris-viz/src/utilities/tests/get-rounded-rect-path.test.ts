import {RoundedBorder} from '@shopify/polaris-viz-core';

import {DEFAULT_BORDER_RADIUS} from '../../constants';
import {
  keepValuePositive,
  getBorderRadius,
  getRoundedRectPath,
} from '../get-rounded-rect-path';

describe('keepValuePositive()', () => {
  it.each([
    [1, 1],
    [10, 10],
    [-100, 0],
    [-0, 0],
    [Infinity, Infinity],
    [-Infinity, 0],
  ])('converts %d to %d', (test, expected) => {
    expect(keepValuePositive(test)).toBe(expected);
  });
});

describe('getBorderRadius()', () => {
  it.each([
    ['None', RoundedBorder.None, [0, 0, 0, 0]],
    ['Top', RoundedBorder.Top, [3, 3, 0, 0]],
    ['Right', RoundedBorder.Right, [0, 3, 3, 0]],
    ['Bottom', RoundedBorder.Bottom, [0, 0, 3, 3]],
    ['Left', RoundedBorder.Left, [3, 0, 0, 3]],
  ])('returns values for %s', (_, test, expected) => {
    expect(getBorderRadius(test, DEFAULT_BORDER_RADIUS)).toStrictEqual(
      expected,
    );
  });

  it('returns different radius value when provided', () => {
    expect(getBorderRadius(RoundedBorder.Top, 10)).toStrictEqual([
      10, 10, 0, 0,
    ]);
  });
});

const EXPECTED_RESULTS = {
  [RoundedBorder.None]: `M0,0 h10 a0,0 0 0 1 0,0 v10 a0,0 0 0 1 -0,0 h-10 a0,0 0 0 1 -0,-0 v-10 a0,0 0 0 1 0,-0 Z`,
  [RoundedBorder.Top]: `M3,0 h4 a3,3 0 0 1 3,3 v7 a0,0 0 0 1 -0,0 h-10 a0,0 0 0 1 -0,-0 v-7 a3,3 0 0 1 3,-3 Z`,
  [RoundedBorder.Right]: `M0,0 h7 a3,3 0 0 1 3,3 v4 a3,3 0 0 1 -3,3 h-7 a0,0 0 0 1 -0,-0 v-10 a0,0 0 0 1 0,-0 Z`,
  [RoundedBorder.Bottom]: `M0,0 h10 a0,0 0 0 1 0,0 v7 a3,3 0 0 1 -3,3 h-4 a3,3 0 0 1 -3,-3 v-7 a0,0 0 0 1 0,-0 Z`,
  [RoundedBorder.Left]: `M3,0 h7 a0,0 0 0 1 0,0 v10 a0,0 0 0 1 -0,0 h-7 a3,3 0 0 1 -3,-3 v-4 a3,3 0 0 1 3,-3 Z`,
};

function makeDSingleLine(value: string) {
  return value
    .split('\n')
    .map((string) => string.trim())
    .join(' ')
    .trim();
}

describe('getRoundedRectPath()', () => {
  it.each([
    ['None', RoundedBorder.None],
    ['Top', RoundedBorder.Top],
    ['Right', RoundedBorder.Right],
    ['Bottom', RoundedBorder.Bottom],
    ['Left', RoundedBorder.Left],
  ])('returns values for %s', (_, test) => {
    const result = getRoundedRectPath({
      height: 10,
      width: 10,
      roundedBorder: test,
      needsMinWidth: false,
    });

    expect(makeDSingleLine(result)).toStrictEqual(EXPECTED_RESULTS[test]);
  });

  it('returns a non-rounded rect if arcs are smaller than overall size', () => {
    const result = getRoundedRectPath({
      height: 1,
      width: 1,
      roundedBorder: RoundedBorder.Left,
      needsMinWidth: false,
    });

    expect(result).toStrictEqual('m 0 0 h 1 v 1 h -1 z');
  });

  describe('needsMinWidth', () => {
    it('returns smaller radius when needsMinWidth=false', () => {
      const result = getRoundedRectPath({
        height: 5,
        width: 5,
        roundedBorder: RoundedBorder.Left,
        needsMinWidth: false,
      });

      expect(makeDSingleLine(result)).toStrictEqual(
        'M3,0 h2 a0,0 0 0 1 0,0 v5 a0,0 0 0 1 -0,0 h-2 a3,3 0 0 1 -3,-3 v-0 a3,3 0 0 1 3,-3 Z',
      );
    });

    it('returns the default radius when needsMinWidth=true', () => {
      const result = getRoundedRectPath({
        height: 5,
        width: 5,
        roundedBorder: RoundedBorder.Left,
        needsMinWidth: true,
      });

      expect(makeDSingleLine(result)).toStrictEqual(
        'M2,0 h3 a0,0 0 0 1 0,0 v5 a0,0 0 0 1 -0,0 h-3 a2,2 0 0 1 -2,-2 v-1 a2,2 0 0 1 2,-2 Z',
      );
    });
  });
});
