import {
  COLOR_VISION_SINGLE_ITEM,
  LinearGradientWithStops,
  changeColorOpacity,
  changeGradientOpacity,
  isGradientType,
  uniqueId,
} from '@shopify/polaris-viz-core';
import {Fragment, useMemo, useState} from 'react';
import type {LineChartSlotProps} from 'types';

import {Point} from '../../../Point';
import {useWatchColorVisionEvents} from '../../../../hooks';
import type {LineChartPredictiveProps} from '../../types';

interface PredictiveLinePointsProps extends LineChartSlotProps {
  data: LineChartPredictiveProps['data'];
}

export function PredictiveLinePoints({
  data,
  xScale,
  yScale,
}: PredictiveLinePointsProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const id = useMemo(() => uniqueId('PredictiveLinePoints'), []);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  return (
    <Fragment>
      {data.map((series, seriesIndex) => {
        if (series.metadata?.isPredictive == null) {
          return false;
        }

        const index = series.metadata?.relatedIndex ?? seriesIndex;
        const pointGradientId = `${id}-point-${index}`;

        const predictiveStartIndex = series.data.findIndex(
          ({key}) => key === series.metadata?.startKey,
        );

        const color = series.color!;

        const pointColor = isGradientType(color)
          ? `url(#${pointGradientId})`
          : changeColorOpacity(color);

        return (
          <Fragment key={`${series.name}-${index}`}>
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
