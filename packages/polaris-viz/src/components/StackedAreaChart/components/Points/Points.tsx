import React, {useState} from 'react';
import type {Series} from 'd3-shape';
import {
  LinearGradientWithStops,
  isGradientType,
  DataType,
  getColorVisionStylesForActiveIndex,
  COLOR_VISION_SINGLE_ITEM,
  changeColorOpacity,
  changeGradientOpacity,
} from '@shopify/polaris-viz-core';

import {Point} from '../../../';
import type {AnimatedCoordinate} from '../../../../types';
import {
  usePrefersReducedMotion,
  useTheme,
  useWatchColorVisionEvents,
} from '../../../../hooks';
import {LineChartMargin as Margin, colorWhite} from '../../../../constants';

interface PointsProps {
  activePointIndex: number | null;
  animatedCoordinates: AnimatedCoordinate[] | null;
  colors: any;
  chartStartPosition: number;
  getXPosition: any;
  isAnimated: boolean;
  stackedValues: Series<
    {
      [key: string]: number;
    },
    string
  >[];
  tooltipId: string;
  xScale: any;
  yScale: any;
  theme?: string;
}

export function Points({
  activePointIndex,
  animatedCoordinates,
  colors,
  chartStartPosition,
  getXPosition,
  isAnimated,
  stackedValues,
  theme,
  tooltipId,
  xScale,
  yScale,
}: PointsProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const selectedTheme = useTheme(theme);
  const {prefersReducedMotion} = usePrefersReducedMotion();

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

  return (
    <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
      {stackedValues.map((_, stackIndex) => {
        if (activePointIndex == null) {
          return null;
        }

        const id = `${tooltipId}-point-${stackIndex}`;
        const color = colors[stackIndex];

        const animatedYPostion =
          animatedCoordinates == null || animatedCoordinates[stackIndex] == null
            ? 0
            : animatedCoordinates[stackIndex].to((coord) => coord.y);

        const pointColor = isGradientType(color)
          ? `url(#${id})`
          : changeColorOpacity(color);

        return (
          <g
            key={stackIndex}
            style={getColorVisionStylesForActiveIndex({
              activeIndex: activeLineIndex,
              index: stackIndex,
              fadedOpacity: 0,
            })}
          >
            {isGradientType(color) && (
              <defs>
                <LinearGradientWithStops
                  id={id}
                  gradient={changeGradientOpacity(color)}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
            )}
            <Point
              stroke={selectedTheme.line.pointStroke}
              color={pointColor}
              cx={getXPosition({isCrosshair: false, index: stackIndex})}
              cy={animatedYPostion}
              active
              index={stackIndex}
              tabIndex={stackIndex === 0 ? 0 : -1}
              isAnimated={isAnimated && !prefersReducedMotion}
            />
          </g>
        );
      })}
      {stackedValues[0].map(([x, y], dataIndex) => {
        // These are the points used for tabbing and
        // a11y. We only render a single series otherwise
        // the tabbing would loop through each set of points
        // for each series.
        return (
          <Point
            dataType={DataType.Point}
            key={`point-${dataIndex}-${x}}`}
            stroke={selectedTheme.line.pointStroke}
            color={colorWhite}
            cx={xScale(dataIndex)}
            cy={yScale(y)}
            active
            index={dataIndex}
            tabIndex={0}
            ariaLabelledby={tooltipId}
            isAnimated={false}
            ariaHidden={false}
            visuallyHidden
          />
        );
      })}
    </g>
  );
}
