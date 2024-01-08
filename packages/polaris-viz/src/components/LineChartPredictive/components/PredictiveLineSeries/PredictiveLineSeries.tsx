import type {Color} from '@shopify/polaris-viz-core';
import {
  COLOR_VISION_SINGLE_ITEM,
  LineSeries,
  LinearGradientWithStops,
  changeColorOpacity,
  changeGradientOpacity,
  isGradientType,
  uniqueId,
} from '@shopify/polaris-viz-core';
import {Fragment, useMemo, useState} from 'react';
import type {LineChartSlotProps} from 'types';

import {Point} from '../../../../components/Point';
import {useWatchColorVisionEvents} from '../../../../hooks';
import {getLineChartDataWithDefaults} from '../../../../utilities/getLineChartDataWithDefaults';
import type {LineChartPredictiveProps} from '../../types';

interface PredictiveLinesProps extends LineChartSlotProps {
  data: LineChartPredictiveProps['data'];
  seriesColors: Color[];
  theme: string;
}

export function PredictiveLineSeries({
  data,
  drawableHeight,
  drawableWidth,
  seriesColors,
  theme,
  xScale,
  yScale,
}: PredictiveLinesProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const id = useMemo(() => uniqueId('PredictiveLines'), []);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  const dataWithDefaults = getLineChartDataWithDefaults(data, seriesColors);

  return (
    <Fragment>
      {dataWithDefaults.map((series, index) => {
        const pointGradientId = `${id}-point-${index}`;

        const predictiveStartIndex = series.data.findIndex(
          ({key}) => key === series.metadata?.startKey,
        );

        const color = series.color;

        const pointColor = isGradientType(color)
          ? `url(#${pointGradientId})`
          : changeColorOpacity(color);

        return (
          <Fragment key={`${series.name}-${index}`}>
            <LineSeries
              activeLineIndex={activeLineIndex}
              data={series}
              index={index}
              svgDimensions={{
                height: drawableHeight,
                width: drawableWidth,
              }}
              xScale={xScale}
              yScale={yScale}
              theme={theme}
            />
            {isGradientType(color) ? (
              <defs>
                <LinearGradientWithStops
                  id={pointGradientId}
                  gradient={changeGradientOpacity(color)}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
            ) : null}
            <Point
              color={pointColor}
              cx={xScale(predictiveStartIndex)}
              cy={yScale(series.data[predictiveStartIndex]?.value ?? -1)}
              active={activeLineIndex === -1 || activeLineIndex === index}
              index={index}
              isAnimated={false}
              ariaHidden
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
}
