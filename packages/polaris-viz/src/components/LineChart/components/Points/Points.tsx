import React, {useState} from 'react';
import type {Interpolation} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';
import {
  LinearGradientWithStops,
  isGradientType,
  DataType,
  getColorVisionStylesForActiveIndex,
  COLOR_VISION_SINGLE_ITEM,
  changeColorOpacity,
  changeGradientOpacity,
} from '@shopify/polaris-viz-core';
import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';

import {useTheme, useWatchColorVisionEvents} from '../../../../hooks';
import {Point} from '../../../Point';
import type {AnimatedCoordinate,} from '../../../../types';

interface PointsProps {
  activeIndex: number | null;
  animatedCoordinates: AnimatedCoordinate[] | null;
  animatePoints: boolean;
  data: LineChartDataSeriesWithDefaults[];
  gradientId: string;
  longestSeriesIndex: number;
  tooltipId: string;
  getXPosition: ({isCrosshair}: {isCrosshair: boolean}) =>
    | number
    | Interpolation<
        | DOMPoint
        | {
            x: number;
            y: number;
          },
        number
      >;
  theme: string;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export function Points({
  activeIndex,
  animatedCoordinates,
  animatePoints,
  data,
  getXPosition,
  gradientId,
  longestSeriesIndex,
  theme,
  tooltipId,
  xScale,
  yScale,
}: PointsProps) {
  const selectedTheme = useTheme(theme);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

  return (
    <React.Fragment>
      {data.map((singleSeries, index) => {
        const {data: singleData, name, color} = singleSeries;
        const isLongestLine = index === longestSeriesIndex;
        const pointGradientId = `${gradientId}-point-${index}`;

        const animatedYPosition =
          animatedCoordinates == null || animatedCoordinates[index] == null
            ? 0
            : animatedCoordinates[index].to((coord) => coord.y);

        const hidePoint =
          animatedCoordinates == null ||
          (activeIndex != null && activeIndex >= singleData.length);

        const pointColor = isGradientType(color)
          ? `url(#${pointGradientId})`
          : changeColorOpacity(color);

        return (
          <React.Fragment key={`${name}-${index}`}>
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

            {animatePoints ? (
              <Point
                color={pointColor}
                stroke={selectedTheme.line.pointStroke}
                cx={getXPosition({isCrosshair: false})}
                cy={animatedYPosition}
                active={activeIndex != null}
                index={index}
                tabIndex={-1}
                isAnimated={animatePoints}
                visuallyHidden={hidePoint}
                ariaHidden
              />
            ) : null}

            {singleData.map(({value}, dataIndex) => {
              if (value == null) {
                return null;
              }

              return (
                <g
                  key={`${name}-${index}-${dataIndex}`}
                  style={getColorVisionStylesForActiveIndex({
                    activeIndex: activeLineIndex,
                    index: data.length - 1 - index,
                    fadedOpacity: 0,
                  })}
                >
                  <Point
                    dataType={DataType.Point}
                    stroke={selectedTheme.line.pointStroke}
                    color={pointColor}
                    cx={xScale(dataIndex)}
                    cy={yScale(value)}
                    active={activeIndex === dataIndex}
                    index={dataIndex}
                    tabIndex={isLongestLine ? 0 : -1}
                    ariaLabelledby={tooltipId}
                    isAnimated={false}
                    ariaHidden={false}
                    visuallyHidden={animatePoints}
                  />
                </g>
              );
            })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
