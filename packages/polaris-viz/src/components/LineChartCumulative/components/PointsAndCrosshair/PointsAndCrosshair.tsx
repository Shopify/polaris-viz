import {Fragment, useRef} from 'react';
import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';
import {uniqueId, useTheme} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import {CROSSHAIR_ID} from '../../../../constants';
import {Crosshair} from '../../../Crosshair';
import {Points} from '../Points';

interface PointsAndCrosshairProps {
  activeIndex: number | null;
  data: LineChartDataSeriesWithDefaults[];
  drawableHeight: number;
  emptyState: boolean;
  longestSeriesIndex: number;
  theme: string;
  tooltipId: string;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

const Y_AXIS_WIDTH_OFFSET = 10;

export function PointsAndCrosshair({
  activeIndex,
  data,
  drawableHeight,
  emptyState,
  longestSeriesIndex,
  theme,
  tooltipId,
  xScale,
  yScale,
}: PointsAndCrosshairProps) {
  const selectedTheme = useTheme(theme);

  const gradientId = useRef(uniqueId('lineChartGradient'));

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    return xScale(activeIndex == null ? 0 : activeIndex) - offset;
  };

  return (
    <Fragment>
      {emptyState ? null : (
        <Crosshair
          height={drawableHeight - Y_AXIS_WIDTH_OFFSET}
          id={`${tooltipId}-${CROSSHAIR_ID}`}
          opacity={activeIndex == null ? 0 : 1}
          theme={theme}
          x={getXPosition({isCrosshair: true})}
        />
      )}
      <Points
        activeIndex={emptyState ? null : activeIndex}
        data={data}
        gradientId={gradientId.current}
        longestSeriesIndex={longestSeriesIndex}
        tooltipId={tooltipId}
        xScale={xScale}
        yScale={yScale}
      />
    </Fragment>
  );
}
