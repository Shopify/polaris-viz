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

import styles from './ComboLineChart.scss';

interface ComboLineChartProps {
  activeIndex: number | null;
  colors: Color[];
  data: DataGroup;
  drawableHeight: number;
  drawableWidth: number;
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

  const {reversedSeries, longestSeriesIndex} = useFormatData(dataWithDefaults);

  return (
    <React.Fragment>
      {dataWithDefaults.map((singleSeries, index) => {
        return (
          <LineSeries
            activeLineIndex={activeLineIndex}
            data={singleSeries}
            index={index + indexOffset}
            key={`${name}-${index}`}
            svgDimensions={{height: drawableHeight, width: drawableWidth}}
            theme={theme}
            xScale={xScale}
            yScale={yScale}
            type="default"
            lineStyles={styles.Line}
            groupStyles={styles.Group}
          />
        );
      })}
      <PointsAndCrosshair
        activeIndex={activeIndex}
        drawableHeight={drawableHeight}
        emptyState={false}
        longestSeriesIndex={longestSeriesIndex}
        reversedSeries={reversedSeries}
        theme={theme}
        tooltipId="none"
        xScale={xScale}
        yScale={yScale}
      />
    </React.Fragment>
  );
}
