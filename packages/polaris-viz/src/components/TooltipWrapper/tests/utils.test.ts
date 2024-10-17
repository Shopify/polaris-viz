import {
  getAbovePosition,
  getBelowPosition,
  getCenterPosition,
  getInlinePosition,
  getLeftPosition,
  getRightPosition,
  getVerticalCenterPosition,
} from '../utilities';
import type {AlteredPositionProps} from '../utilities';

const MARGIN = {Top: 0, Left: 0, Right: 0, Bottom: 0};
const BASE_PROPS: AlteredPositionProps = {
  chartBounds: {height: 100, width: 100, x: 0, y: 0},
  tooltipDimensions: {height: 20, width: 20},
  margin: MARGIN,
  bandwidth: 40,
  currentX: 0,
  currentY: 0,
  position: {
    horizontal: 0,
    vertical: 0,
  },
  isPerformanceImpacted: false,
};

let windowSpy;

function mockWindow({scrollY = 0, innerHeight = 1000, innerWidth = 500}) {
  windowSpy.mockImplementation(() => ({
    scrollY,
    innerHeight,
    innerWidth,
  }));
}

describe('utilities', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    mockWindow({});
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe('getInlinePosition()', () => {
    it('returns altered values', () => {
      expect(getInlinePosition(30, BASE_PROPS)).toStrictEqual({
        value: 30,
        wasOutsideBounds: false,
      });

      expect(getInlinePosition(1000, BASE_PROPS)).toStrictEqual({
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
      const currentY = 0;
      const scrollTop = 15;

      expect(
        getAbovePosition(0, {
          ...BASE_PROPS,
          currentY,
          scrollContainer: {scrollTop} as Element,
        }),
      ).toStrictEqual({
        value: currentY - scrollTop,
        wasOutsideBounds: true,
      });

      expect(getAbovePosition(50, {...BASE_PROPS, currentY: 50})).toStrictEqual(
        {
          value: 10,
          wasOutsideBounds: false,
        },
      );
    });
  });

  describe('getBelowPosition()', () => {
    it('returns altered values', () => {
      expect(getBelowPosition(0, BASE_PROPS)).toStrictEqual({
        value: 40,
        wasOutsideBounds: false,
      });

      expect(getBelowPosition(40, BASE_PROPS)).toStrictEqual({
        value: 80,
        wasOutsideBounds: false,
      });

      expect(getBelowPosition(1090, BASE_PROPS)).toStrictEqual({
        value: 1090,
        wasOutsideBounds: true,
      });
    });
  });

  describe('getLeftPosition()', () => {
    it('returns altered values', () => {
      expect(getLeftPosition(0, {...BASE_PROPS, currentX: 0})).toStrictEqual({
        value: 60,
        wasOutsideBounds: true,
      });

      expect(getLeftPosition(40, {...BASE_PROPS, currentX: 40})).toStrictEqual({
        value: 0,
        wasOutsideBounds: false,
      });

      expect(getLeftPosition(90, {...BASE_PROPS, currentX: 90})).toStrictEqual({
        value: 50,
        wasOutsideBounds: false,
      });
    });
  });

  describe('getRightPosition()', () => {
    it('returns altered values', () => {
      expect(getRightPosition(0, BASE_PROPS)).toStrictEqual({
        value: 60,
        wasOutsideBounds: false,
      });

      expect(getRightPosition(40, BASE_PROPS)).toStrictEqual({
        value: 100,
        wasOutsideBounds: false,
      });

      expect(getRightPosition(690, BASE_PROPS)).toStrictEqual({
        value: 650,
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

      expect(getCenterPosition(690, BASE_PROPS)).toStrictEqual({
        value: 440,
        wasOutsideBounds: true,
      });
    });
  });
});
