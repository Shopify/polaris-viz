import {BORDER_RADIUS} from '../../constants';
import {keepValuePositive, getRoundedRectPath} from '../getRoundedRectPath';

describe('keepValuePositive()', () => {
  it.each([
    [1, 1],
    [10, 10],
    [-100, 0],
    [-0, 0],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    [-Number.MAX_SAFE_INTEGER, 0],
  ])('converts %d to %d', (test, expected) => {
    expect(keepValuePositive(test)).toBe(expected);
  });
});

const EXPECTED_RESULTS = {
  [BORDER_RADIUS.None]: `M0,0 h10 a0,0 0 0 1 0,0 v10 a0,0 0 0 1 -0,0 h-10 a0,0 0 0 1 -0,-0 v-10 a0,0 0 0 1 0,-0 Z`,
  [BORDER_RADIUS.Top]: `M3,0 h4 a3,3 0 0 1 3,3 v7 a0,0 0 0 1 -0,0 h-10 a0,0 0 0 1 -0,-0 v-7 a3,3 0 0 1 3,-3 Z`,
  [BORDER_RADIUS.Right]: `M0,0 h7 a3,3 0 0 1 3,3 v4 a3,3 0 0 1 -3,3 h-7 a0,0 0 0 1 -0,-0 v-10 a0,0 0 0 1 0,-0 Z`,
  [BORDER_RADIUS.Bottom]: `M0,0 h10 a0,0 0 0 1 0,0 v7 a3,3 0 0 1 -3,3 h-4 a3,3 0 0 1 -3,-3 v-7 a0,0 0 0 1 0,-0 Z`,
  [BORDER_RADIUS.Left]: `M3,0 h7 a0,0 0 0 1 0,0 v10 a0,0 0 0 1 -0,0 h-7 a3,3 0 0 1 -3,-3 v-4 a3,3 0 0 1 3,-3 Z`,
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
    ['None', BORDER_RADIUS.None],
    ['Top', BORDER_RADIUS.Top],
    ['Right', BORDER_RADIUS.Right],
    ['Bottom', BORDER_RADIUS.Bottom],
    ['Left', BORDER_RADIUS.Left],
  ])('returns values for %s', (_, test) => {
    const result = getRoundedRectPath({
      height: 10,
      width: 10,
      borderRadius: test,
    });

    expect(makeDSingleLine(result)).toStrictEqual(EXPECTED_RESULTS[test]);
  });

  it('clamps the radius if the borderRadius is larger than the height', () => {
    const result = getRoundedRectPath({
      height: 5,
      width: 100,
      borderRadius: '0 10 10 0',
    });

    expect(makeDSingleLine(result)).toStrictEqual(
      'M0,0 h97.5 a2.5,2.5 0 0 1 2.5,2.5 v0 a2.5,2.5 0 0 1 -2.5,2.5 h-97.5 a0,0 0 0 1 -0,-0 v-5 a0,0 0 0 1 0,-0 Z',
    );
  });

  it('clamps the radius if the borderRadius is larger than the width', () => {
    const result = getRoundedRectPath({
      height: 100,
      width: 5,
      borderRadius: '10 0 0 10',
    });

    expect(makeDSingleLine(result)).toStrictEqual(
      'M2.5,0 h2.5 a0,0 0 0 1 0,0 v100 a0,0 0 0 1 -0,0 h-2.5 a2.5,2.5 0 0 1 -2.5,-2.5 v-95 a2.5,2.5 0 0 1 2.5,-2.5 Z',
    );
  });
});
