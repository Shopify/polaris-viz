import type {AlteredPositionProps} from '../../../TooltipWrapper';
import {
  TooltipVerticalOffset,
  TooltipHorizontalOffset,
} from '../../../TooltipWrapper';
import {getAlteredLineChartPosition} from '../getAlteredLineChartPosition';

const MARGIN = {Top: 0, Left: 0, Right: 0, Bottom: 0};

const BASE_PROPS: AlteredPositionProps = {
  isPerformanceImpacted: false,
  chartBounds: {height: 100, width: 200, x: 0, y: 100},
  tooltipDimensions: {height: 40, width: 60},
  margin: MARGIN,
  bandwidth: 40,
  currentX: 0,
  currentY: 0,
  position: {
    horizontal: TooltipHorizontalOffset.Left,
    vertical: TooltipVerticalOffset.Center,
  },
};

let windowSpy;

function mockWindow({scrollY = 0, innerHeight = 1000, innerWidth = 500}) {
  windowSpy.mockImplementation(() => ({
    scrollY,
    innerHeight,
    innerWidth,
  }));
}

describe('getAlteredLineChartPosition', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe('y', () => {
    it('applies scrollY to clamped value', () => {
      mockWindow({
        scrollY: 60,
      });

      expect(
        getAlteredLineChartPosition({
          ...BASE_PROPS,
          currentX: 0,
          currentY: 0,
        }),
      ).toStrictEqual({x: 60, y: 80});
    });

    it('clamps to the bottom of a window', () => {
      mockWindow({
        scrollY: 400,
      });

      expect(
        getAlteredLineChartPosition({
          ...BASE_PROPS,
          currentX: 0,
          currentY: 2000,
        }),
      ).toStrictEqual({x: 60, y: 1340});
    });

    it('uses chartBounds whe performance is impacted', () => {
      expect(
        getAlteredLineChartPosition({
          ...BASE_PROPS,
          isPerformanceImpacted: true,
          currentX: 0,
          currentY: 2000,
        }),
      ).toStrictEqual({x: 60, y: 100});
    });
  });

  describe('x', () => {
    it('clamps to the left of a window', () => {
      mockWindow({
        scrollY: 0,
      });

      expect(
        getAlteredLineChartPosition({
          ...BASE_PROPS,
          currentX: -1000,
          currentY: 0,
        }),
      ).toStrictEqual({x: 20, y: 20});
    });

    it('clamps to the right of a window', () => {
      mockWindow({
        scrollY: 0,
      });

      expect(
        getAlteredLineChartPosition({
          ...BASE_PROPS,
          currentX: 1000,
          currentY: 0,
        }),
      ).toStrictEqual({x: 400, y: 20});
    });
  });
});
