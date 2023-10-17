import type {AlteredPositionProps} from '../../../TooltipWrapper';
import {
  TooltipVerticalOffset,
  TooltipHorizontalOffset,
} from '../../../TooltipWrapper';
import {getAlteredStackedAreaChartPosition} from '../getAlteredStackedAreaChartPosition';

const MARGIN = {Top: 0, Left: 0, Right: 0, Bottom: 0};
const TOOLTIP_MARGIN = 20;

const BASE_PROPS: AlteredPositionProps = {
  isPerformanceImpacted: false,
  chartBounds: {height: 100, width: 200, x: 0, y: 100},
  tooltipDimensions: {height: 40, width: 60},
  margin: MARGIN,
  bandwidth: 40,
  currentX: 20,
  currentY: 0,
  position: {
    horizontal: TooltipHorizontalOffset.Left,
    vertical: TooltipVerticalOffset.Center,
  },
};

describe('getAlteredStackedAreaChartPosition', () => {
  it('returns the original position of y when currentY is within the chart bounds', () => {
    const props = {
      ...BASE_PROPS,
      currentX: 50,
      currentY: 50,
    };

    const result = getAlteredStackedAreaChartPosition(props);

    expect(result.x).toBe(50);
    expect(result.y).toBe(50);
  });

  it('returns the adjusted position when currentY is greater than chartBounds.y + chartBounds.height', () => {
    const props = {
      ...BASE_PROPS,
      currentY: 300,
    };

    const chartBounds = props.chartBounds;
    const tooltipDimensions = props.tooltipDimensions;
    const margin = props.margin;
    const result = getAlteredStackedAreaChartPosition(props);

    expect(result.x).toBe(20);

    expect(result.y).toBe(
      chartBounds.height -
        tooltipDimensions.height -
        TOOLTIP_MARGIN -
        margin.Bottom,
    );
  });

  it('returns the adjusted position when currentY is equal to chartBounds.y + chartBounds.height', () => {
    const props = {
      ...BASE_PROPS,
      currentY: 200,
    };

    const chartBounds = props.chartBounds;
    const tooltipDimensions = props.tooltipDimensions;
    const margin = props.margin;
    const result = getAlteredStackedAreaChartPosition(props);

    expect(result.x).toBe(20);

    expect(result.y).toBe(
      chartBounds.height -
        tooltipDimensions.height -
        TOOLTIP_MARGIN -
        margin.Bottom,
    );
  });
});
