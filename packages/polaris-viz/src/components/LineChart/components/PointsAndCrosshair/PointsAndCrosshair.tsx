import React, {useMemo, useRef} from 'react';
import {
  curveStepRounded,
  DataPoint,
  LineChartDataSeriesWithDefaults,
  uniqueId,
  useTheme,
} from '@shopify/polaris-viz-core';
import {line} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';

import {useLinearChartAnimations} from '../../../../hooks';
import {MAX_ANIMATED_SERIES_LENGTH} from '../../../../constants';
import {Crosshair} from '../../../Crosshair';
import {Points} from '../Points';

interface PointsAndCrosshairProps {
  activeIndex: number | null;
  drawableHeight: number;
  emptyState: boolean;
  isAnimated: boolean;
  longestSeriesIndex: number;
  longestSeriesLength: number;
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
  isAnimated,
  longestSeriesIndex,
  longestSeriesLength,
  reversedSeries,
  theme,
  tooltipId,
  xScale,
  yScale,
}: PointsAndCrosshairProps) {
  const selectedTheme = useTheme(theme);

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

  const animatePoints =
    isAnimated && longestSeriesLength <= MAX_ANIMATED_SERIES_LENGTH;

  const {animatedCoordinates} = useLinearChartAnimations({
    data: reversedSeries,
    lineGenerator,
    activeIndex,
    isAnimated: animatePoints,
  });

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      animatedCoordinates != null &&
      animatedCoordinates[longestSeriesIndex] != null &&
      animatePoints
    ) {
      return animatedCoordinates[longestSeriesIndex].to(
        (coord) => coord.x - offset,
      );
    }
    return xScale(activeIndex == null ? 0 : activeIndex) - offset;
  };

  return (
    <React.Fragment>
      {emptyState ? null : (
        <Crosshair
          x={getXPosition({isCrosshair: true})}
          height={drawableHeight}
          opacity={activeIndex == null ? 0 : 1}
          theme={theme}
        />
      )}
      <Points
        activeIndex={emptyState ? null : activeIndex}
        animatedCoordinates={animatedCoordinates}
        animatePoints={animatePoints}
        data={reversedSeries}
        getXPosition={getXPosition}
        gradientId={gradientId.current}
        longestSeriesIndex={longestSeriesIndex}
        theme={theme}
        tooltipId={tooltipId}
        xScale={xScale}
        yScale={yScale}
      />
      *
    </React.Fragment>
  );
}
