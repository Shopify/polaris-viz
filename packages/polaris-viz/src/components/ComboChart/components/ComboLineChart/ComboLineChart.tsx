import React, {useState} from 'react';
import {
  Color,
  COLOR_VISION_SINGLE_ITEM,
  DataGroup,
  LineSeries,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../../hooks';
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
  indexOffset: number;
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
  indexOffset,
  isAnimated,
  theme,
  xScale,
  yScale,
}: ComboLineChartProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  const dataWithDefaults = getLineChartDataWithDefaults(data.series, colors);

  const {reversedSeries, longestSeriesLength, longestSeriesIndex} =
    useFormatData(dataWithDefaults);

  return (
    <React.Fragment>
      {dataWithDefaults.map((singleSeries, index) => {
        return (
          <LineSeries
            activeLineIndex={activeLineIndex}
            data={singleSeries}
            index={index + indexOffset}
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
