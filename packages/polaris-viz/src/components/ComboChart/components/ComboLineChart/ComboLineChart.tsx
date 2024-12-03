import {Fragment, useState} from 'react';
import type {Color, DataGroup} from '@shopify/polaris-viz-core';
import {COLOR_VISION_SINGLE_ITEM, LineSeries} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../../hooks/ColorVisionA11y/useWatchColorVisionEvents';
import {PointsAndCrosshair} from '../../../LineChart/components/PointsAndCrosshair/PointsAndCrosshair';
import {useFormatData} from '../../../LineChart/hooks/useFormatData';
import {getLineChartDataWithDefaults} from '../../../../utilities/getLineChartDataWithDefaults';

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

  const {longestSeriesIndex} = useFormatData(dataWithDefaults);

  return (
    <Fragment>
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
          />
        );
      })}
      <PointsAndCrosshair
        activeIndex={activeIndex}
        data={dataWithDefaults}
        drawableHeight={drawableHeight}
        emptyState={false}
        longestSeriesIndex={longestSeriesIndex}
        theme={theme}
        tooltipId="none"
        xScale={xScale}
        yScale={yScale}
      />
    </Fragment>
  );
}
