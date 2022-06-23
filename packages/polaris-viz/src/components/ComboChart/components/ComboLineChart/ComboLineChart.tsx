import React from 'react';
import {Color, DataGroup, LineSeries} from '@shopify/polaris-viz-core';

import {PointsAndCrosshair} from '../../../LineChart';
import {useFormatData} from '../../../LineChart/hooks';
import {getLineChartDataWithDefaults} from '../../../../utilities/getLineChartDataWithDefaults';

interface ComboLineChartProps {
  activeIndex: number | null;
  colors: Color[];
  data: DataGroup;
  drawableHeight: number;
  drawableWidth: number;
  isAnimated: boolean;
  theme: string;
  xScale;
  yScale;
}

export function ComboLineChart({
  activeIndex,
  colors,
  data,
  drawableHeight,
  drawableWidth,
  isAnimated,
  theme,
  xScale,
  yScale,
}: ComboLineChartProps) {
  const dataWithDefaults = getLineChartDataWithDefaults(data.series, colors);

  const {reversedSeries, longestSeriesLength, longestSeriesIndex} =
    useFormatData(dataWithDefaults);

  return (
    <React.Fragment>
      {dataWithDefaults.map((singleSeries, index) => {
        return (
          <LineSeries
            activeLineIndex={-1}
            data={singleSeries}
            index={data.series.length - 1 - index}
            isAnimated={isAnimated}
            key={`${name}-${index}`}
            svgDimensions={{height: drawableHeight, width: drawableWidth}}
            theme={theme}
            xScale={xScale}
            yScale={yScale}
            type="default"
          />
        );
      })}
      <PointsAndCrosshair
        activeIndex={activeIndex}
        drawableHeight={drawableHeight}
        emptyState={false}
        isAnimated={isAnimated}
        longestSeriesIndex={longestSeriesIndex}
        longestSeriesLength={longestSeriesLength}
        reversedSeries={reversedSeries}
        theme={theme}
        tooltipId="none"
        xScale={xScale}
        yScale={yScale}
      />
    </React.Fragment>
  );
}
