import React, {useMemo} from 'react';
import isEqual from 'lodash.isequal';
import {animated, useSpring} from 'react-spring';
import {area, Series, curveMonotoneX} from 'd3-shape';
import {Color} from 'types';
import {ScaleLinear} from 'd3-scale';

import {getColorValue, uniqueId} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';

import {usePrevious} from './hooks';

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
  opacity: number;
  isAnimated: boolean;
}

export function Areas({
  width,
  height,
  stackedValues,
  transform,
  xScale,
  yScale,
  colors,
  opacity,
  isAnimated,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const prevstackedValues = usePrevious(stackedValues);
  const valuesHaveNotUpdated = isEqual(prevstackedValues, stackedValues);

  const spring = useSpring({
    config: {duration: 1000},
    width,
    from: {
      width: 0,
    },
    immediate: prefersReducedMotion || !isAnimated || valuesHaveNotUpdated,
    reset: true,
  });

  // const areaShape = area<number[]>()
  //   .defined(
  //     ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
  //   )
  //   .x((_, index) => xScale(index))
  //   .y0(([firstPoint]) => yScale(firstPoint))
  //   .y1(([, lastPoint]) => yScale(lastPoint));

  const areaShape = area<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y0(([firstPoint]) => yScale(firstPoint))
    .y1(([, lastPoint]) => yScale(lastPoint))
    .curve(curveMonotoneX);

  const id = useMemo(() => uniqueId('stackedAreas'), []);

  return (
    <React.Fragment>
      <clipPath id={id}>
        <animated.rect width={spring.width} height={height} fill="none" />
      </clipPath>

      <g transform={transform} clipPath={`url(#${id})`}>
        {stackedValues.map((value, index) => {
          const shape = areaShape(value);

          if (shape == null) {
            return null;
          }

          const color = getColorValue(colors[index]);

          return (
            <path
              key={index}
              d={shape}
              fill={color}
              stroke={color}
              strokeWidth="0.1"
              opacity={opacity}
            />
          );
        })}
      </g>
    </React.Fragment>
  );
}

export const StackedAreas = React.memo(Areas);
