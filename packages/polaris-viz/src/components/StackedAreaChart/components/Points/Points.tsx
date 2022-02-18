import React, {useState} from 'react';
import type {Series} from 'd3-shape';
import type {Interpolation} from '@react-spring/web';
import {
  LinearGradientWithStops,
  isGradientType,
  DataType,
} from '@shopify/polaris-viz-core';

import {Point} from '../../../';
import {changeColorOpacity, changeGradientOpacity} from '../../../../utilities';
import {
  getOpacityStylesForActive,
  usePrefersReducedMotion,
  useTheme,
  useWatchColorVisionEvents,
} from '../../../../hooks';
import {
  LineChartMargin as Margin,
  colorWhite,
  COLOR_VISION_SINGLE_ITEM,
} from '../../../../constants';

interface PointsProps {
  activePointIndex: number | null;
  animatedCoordinates:
    | Interpolation<
        number,
        | DOMPoint
        | {
            x: number;
            y: number;
          }
      >[]
    | null;
  colors: any;
  dataStartPosition: number;
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
  dataStartPosition,
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
    <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
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
            style={getOpacityStylesForActive({
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
