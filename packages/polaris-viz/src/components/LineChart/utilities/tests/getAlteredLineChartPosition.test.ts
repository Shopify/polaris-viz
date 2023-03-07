import type {AlteredPositionProps} from '../../../TooltipWrapper';
import {
  TooltipVerticalOffset,
  TooltipHorizontalOffset,
} from '../../../TooltipWrapper';
import {getAlteredLineChartPosition} from '../getAlteredLineChartPosition';

const MARGIN = {Top: 0, Left: 0, Right: 0, Bottom: 0};

const BASE_PROPS: AlteredPositionProps = {
  isPerformanceImpacted: false,
  chartBounds: {height: 100, width: 200, x: 0, y: 0},
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

describe('getAlteredLineChartPosition', () => {
  it.each([
    ['y: 0', {x: 0, y: 0}, {x: 60, y: 0}],
    ['y: 50', {x: 0, y: 50}, {x: 60, y: 50}],
    ['y: 100', {x: 0, y: 100}, {x: 60, y: 60}],

    ['x: 0', {x: 0, y: 0}, {x: 60, y: 0}],
    ['x: 40', {x: 40, y: 0}, {x: 100, y: 0}],
    ['x: 80', {x: 80, y: 0}, {x: 140, y: 0}],
    ['x: 100', {x: 100, y: 0}, {x: 160, y: 0}],
    ['x: 120', {x: 120, y: 0}, {x: 40, y: 0}],
    ['x: 160', {x: 160, y: 0}, {x: 80, y: 0}],
    ['x: 200', {x: 200, y: 0}, {x: 120, y: 0}],
  ])(`alters position when cursor is %s`, (_, {x, y}, result) => {
    expect(
      getAlteredLineChartPosition({
        ...BASE_PROPS,
        currentX: x,
        currentY: y,
      }),
    ).toStrictEqual(result);
  });
});
