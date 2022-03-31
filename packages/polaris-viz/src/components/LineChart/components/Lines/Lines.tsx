import {
  isGradientType,
  LinearGradientWithStops,
} from '@shopify/polaris-viz-core';
import React, {useState} from 'react';

import {useWatchColorVisionEvents} from '../../../../hooks';
import {COLOR_VISION_SINGLE_ITEM} from '../../../../constants';
import {Line} from '../Line';

interface Props {
  reversedSeries: any;
  gradientId: any;
  isAnimated: any;
  lineGenerator: any;
  theme: any;
}

export function Lines({
  gradientId,
  isAnimated,
  lineGenerator,
  reversedSeries,
  theme,
}: Props) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  return (
    <React.Fragment>
      {reversedSeries.map((singleSeries, index) => {
        const {name, color, areaColor} = singleSeries;
        const seriesGradientId = `${gradientId.current}-${index}`;

        const lineColor = isGradientType(color)
          ? `url(#${seriesGradientId})`
          : color;

        return (
          <React.Fragment key={`${name}-${index}`}>
            {isGradientType(color) ? (
              <defs>
                <LinearGradientWithStops
                  id={seriesGradientId}
                  gradient={color}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
            ) : null}
            <Line
              activeLineIndex={activeLineIndex}
              color={lineColor}
              index={reversedSeries.length - 1 - index}
              isAnimated={isAnimated}
              lineGenerator={lineGenerator}
              series={singleSeries}
              theme={theme}
            >
              {/* {areaColor != null ? (
                <GradientArea
                  series={singleSeries}
                  yScale={yScale}
                  xScale={xScale}
                  hasSpline={selectedTheme.line.hasSpline}
                />
              ) : null} */}
            </Line>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
