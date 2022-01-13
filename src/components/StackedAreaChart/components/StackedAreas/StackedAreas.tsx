import React, {useMemo} from 'react';
import isEqual from 'fast-deep-equal';
import {area, line} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';

import type {Color} from '../../../../types';
import {curveStepRounded, uniqueId} from '../../../../utilities';
import {usePrevious, useTheme} from '../../../../hooks';
import type {StackedSeries} from '../../types';
import {Area} from '..';

import styles from './StackedAreas.scss';

interface Props {
  transform: string;
  colors: Color[];
  stackedValues: StackedSeries[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  isAnimated: boolean;
  theme?: string;
}

const FAST_DURATION = 100;
const SLOW_DURATION = 325;
const FAST_COUNT = 10;
const DURATION_STEP = 25;

export function Areas({
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

  const id = useMemo(() => uniqueId('stackedAreas'), []);

  const areaGenerator = area<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y0(([firstPoint]) => yScale(firstPoint))
    .y1(([, lastPoint]) => yScale(lastPoint));

  const lineGenerator = line<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y(([, lastPoint]) => yScale(lastPoint));

  if (selectedTheme.line.hasSpline) {
    areaGenerator.curve(curveStepRounded);
    lineGenerator.curve(curveStepRounded);
  }

  const duration = useMemo(() => {
    const count = stackedValues.length;
    const duration =
      count > FAST_COUNT
        ? FAST_DURATION
        : SLOW_DURATION - count * DURATION_STEP;

    return Math.round(duration / DURATION_STEP) * DURATION_STEP;
  }, [stackedValues.length]);

  return (
    <g transform={transform} className={styles.Group}>
      {stackedValues.map((data, index) => {
        return (
          <Area
            animationIndex={stackedValues.length - 1 - index}
            areaGenerator={areaGenerator}
            colors={colors}
            data={data}
            duration={duration}
            id={id}
            index={index}
            isImmediate={!isAnimated || valuesHaveNotUpdated}
            key={index}
            lineGenerator={lineGenerator}
            selectedTheme={selectedTheme}
          />
        );
      })}
    </g>
  );
}

export const StackedAreas = React.memo(Areas);
