import {
  getAbovePosition,
  getBelowPosition,
  getCenterPosition,
  getInlinePosition,
  getLeftPosition,
  getRightPosition,
  getVerticalCenterPosition,
} from '../utils';

const MARGIN = {Top: 0, Left: 0, Right: 0, Bottom: 0};
const BASE_PROPS = {
  chartDimensions: {height: 100, width: 100},
  tooltipDimensions: {height: 20, width: 20},
  margin: MARGIN,
  bandwidth: 40,
} as any;

describe('getInlinePosition()', () => {
  it('returns altered values', () => {
    expect(getInlinePosition(0, BASE_PROPS)).toStrictEqual({
      value: 0,
      wasOutsideBounds: false,
    });

    expect(getInlinePosition(90, BASE_PROPS)).toStrictEqual({
      value: 80,
      wasOutsideBounds: true,
    });
  });
});

describe('getVerticalCenterPosition()', () => {
  it('returns altered values', () => {
    expect(
      getVerticalCenterPosition(0, {...BASE_PROPS, currentY: 0}),
    ).toStrictEqual({
      value: 0,
      wasOutsideBounds: true,
    });

    expect(
      getVerticalCenterPosition(40, {...BASE_PROPS, currentY: 40}),
    ).toStrictEqual({
      value: 30,
      wasOutsideBounds: false,
    });
  });
});

describe('getAbovePosition()', () => {
  it('returns altered values', () => {
    expect(getAbovePosition(0, {...BASE_PROPS, currentY: 0})).toStrictEqual({
      value: 0,
      wasOutsideBounds: true,
    });

    expect(getAbovePosition(40, {...BASE_PROPS, currentY: 40})).toStrictEqual({
      value: 10,
      wasOutsideBounds: false,
    });
  });
});

describe('getBelowPosition()', () => {
  it('returns altered values', () => {
    expect(getBelowPosition(0, BASE_PROPS)).toStrictEqual({
      value: 20,
      wasOutsideBounds: false,
    });

    expect(getBelowPosition(40, BASE_PROPS)).toStrictEqual({
      value: 60,
      wasOutsideBounds: false,
    });

    expect(getBelowPosition(90, BASE_PROPS)).toStrictEqual({
      value: 80,
      wasOutsideBounds: true,
    });
  });
});

describe('getLeftPosition()', () => {
  it('returns altered values', () => {
    expect(getLeftPosition(0, {...BASE_PROPS, currentX: 0})).toStrictEqual({
      value: 50,
      wasOutsideBounds: true,
    });

    expect(getLeftPosition(40, {...BASE_PROPS, currentX: 40})).toStrictEqual({
      value: 10,
      wasOutsideBounds: false,
    });

    expect(getLeftPosition(90, {...BASE_PROPS, currentX: 90})).toStrictEqual({
      value: 60,
      wasOutsideBounds: false,
    });
  });
});

describe('getRightPosition()', () => {
  it('returns altered values', () => {
    expect(getRightPosition(0, BASE_PROPS)).toStrictEqual({
      value: 50,
      wasOutsideBounds: false,
    });

    expect(getRightPosition(40, BASE_PROPS)).toStrictEqual({
      value: 90,
      wasOutsideBounds: false,
    });

    expect(getRightPosition(90, BASE_PROPS)).toStrictEqual({
      value: 60,
      wasOutsideBounds: true,
    });
  });
});

describe('getCenterPosition()', () => {
  it('returns altered values', () => {
    expect(getCenterPosition(-10, BASE_PROPS)).toStrictEqual({
      value: 0,
      wasOutsideBounds: false,
    });

    expect(getCenterPosition(0, BASE_PROPS)).toStrictEqual({
      value: 10,
      wasOutsideBounds: false,
    });

    expect(getCenterPosition(40, BASE_PROPS)).toStrictEqual({
      value: 50,
      wasOutsideBounds: false,
    });

    expect(getCenterPosition(90, BASE_PROPS)).toStrictEqual({
      value: 60,
      wasOutsideBounds: true,
    });
  });
});
