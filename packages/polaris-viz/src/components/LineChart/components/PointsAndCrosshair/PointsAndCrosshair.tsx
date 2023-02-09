import {Fragment, useMemo, useRef} from 'react';
import type {
  DataPoint,
  LineChartDataSeriesWithDefaults,
} from '@shopify/polaris-viz-core';
import {
  curveStepRounded,
  uniqueId,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';
import {line} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';

import {CROSSHAIR_ID} from '../../../../constants';
import {useLinearChartAnimations} from '../../../../hooks';
import {Crosshair} from '../../../Crosshair';
import {Points} from '../Points';

interface PointsAndCrosshairProps {
  activeIndex: number | null;
  drawableHeight: number;
  emptyState: boolean;
  longestSeriesIndex: number;
  reversedSeries: LineChartDataSeriesWithDefaults[];
  theme: string;
  tooltipId: string;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export function PointsAndCrosshair({
  activeIndex,
  drawableHeight,
  emptyState,
  longestSeriesIndex,
  reversedSeries,
  theme,
  tooltipId,
  xScale,
  yScale,
}: PointsAndCrosshairProps) {
  const selectedTheme = useTheme(theme);
  const {shouldAnimate, isPerformanceImpacted} = useChartContext();

  const gradientId = useRef(uniqueId('lineChartGradient'));

  const lineGenerator = useMemo(() => {
    const generator = line<DataPoint>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({value}) => yScale(value ?? 0));

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }
    return generator;
  }, [selectedTheme.line.hasSpline, xScale, yScale]);

  const {animatedCoordinates} = useLinearChartAnimations({
    data: reversedSeries,
    lineGenerator,
    activeIndex,
  });

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      animatedCoordinates != null &&
      animatedCoordinates[longestSeriesIndex] != null &&
      shouldAnimate
    ) {
      return animatedCoordinates[longestSeriesIndex].to(
        (coord) => coord.x - offset,
      );
    }
    return xScale(activeIndex == null ? 0 : activeIndex) - offset;
  };

  return (
    <Fragment>
      {emptyState ? null : (
        <Crosshair
          height={drawableHeight}
          id={`${tooltipId}-${CROSSHAIR_ID}`}
          opacity={activeIndex == null ? 0 : 1}
          theme={theme}
          x={getXPosition({isCrosshair: true})}
        />
      )}
      {isPerformanceImpacted ? null : (
        <Points
          activeIndex={emptyState ? null : activeIndex}
          animatedCoordinates={animatedCoordinates}
          data={reversedSeries}
          getXPosition={getXPosition}
          gradientId={gradientId.current}
          longestSeriesIndex={longestSeriesIndex}
          tooltipId={tooltipId}
          xScale={xScale}
          yScale={yScale}
        />
      )}
    </Fragment>
  );
}
