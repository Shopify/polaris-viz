import React, {useMemo} from 'react';
import isEqual from 'fast-deep-equal';
import {animated, useSpring} from '@react-spring/web';
import {area, line, Series} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';
import type {Color, GradientStop} from 'types';

import {LinearGradient} from 'components/LinearGradient';
import {
  curveStepRounded,
  isGradientType,
  uniqueId,
} from 'utilities';
import {usePrevious, useTheme} from 'hooks';

type StackedSeries = Series<
  {
    [key: string]: number;
  },
  string
>;

interface Props {
  width: number;
  height: number;
  transform: string;
  colors: Color[];
  stackedValues: StackedSeries[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  isAnimated: boolean;
  theme?: string;
}

export function Areas({
  width,
  height,
  stackedValues,
  transform,
  xScale,
  yScale,
  colors,
  isAnimated,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);
  const prevstackedValues = usePrevious(stackedValues);
  const valuesHaveNotUpdated = isEqual(prevstackedValues, stackedValues);

  const spring = useSpring({
    config: {duration: 1000},
    width,
    from: {
      width: 0,
    },
    immediate: !isAnimated || valuesHaveNotUpdated,
    reset: true,
  });

  const areaShape = area<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y0(([firstPoint]) => yScale(firstPoint))
    .y1(([, lastPoint]) => yScale(lastPoint));

  const lineShape = line<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y(([, lastPoint]) => yScale(lastPoint));

  if (selectedTheme.line.hasSpline) {
    areaShape.curve(curveStepRounded);
    lineShape.curve(curveStepRounded);
  }

  const id = useMemo(() => uniqueId('stackedAreas'), []);

  return (
    <React.Fragment>
      <clipPath id={id}>
        <animated.rect width={spring.width} height={height} fill="none" />
      </clipPath>

      <g transform={transform} clipPath={`url(#${id})`}>
        {stackedValues.map((value, index) => {
          const shape = areaShape(value);
          const line = lineShape(value);

          if (shape == null || line == null) {
            return null;
          }

          const currentColor = colors[index];
          const isGradient = isGradientType(currentColor);

          const gradient = isGradient
            ? currentColor
            : [{offset: 0, color: currentColor}];

          return (
            <React.Fragment key={index}>
              <defs>
                <LinearGradient
                  id={`area-${id}-${index}`}
                  gradient={gradient as GradientStop[]}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
              <path
                key={`line-${index}`}
                d={line}
                fill="none"
                stroke={`url(#area-${id}-${index})`}
                strokeWidth={selectedTheme.line.width}
              />
              <path
                key={index}
                d={shape}
                fill={`url(#area-${id}-${index})`}
                fillOpacity="0.25"
              />
            </React.Fragment>
          );
        })}
      </g>
    </React.Fragment>
  );
}

export const StackedAreas = React.memo(Areas);
