import React, {useMemo, useState} from 'react';
import isEqual from 'fast-deep-equal';
import {area, line} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';

import {
  LINE_ANIMATION_FAST_COUNT,
  LINE_ANIMATION_FAST_DURATION,
  LINE_ANIMATION_SLOW_DURATION,
  LINE_ANIMATION_DURATION_STEP,
  COLOR_VISION_SINGLE_ITEM,
} from '../../../../constants';
import type {Color, StackedSeries} from '../../../../types';
import {curveStepRounded, uniqueId} from '../../../../utilities';
import {
  usePrevious,
  useTheme,
  useWatchColorVisionEvents,
} from '../../../../hooks';
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

export function Areas({
  stackedValues,
  transform,
  xScale,
  yScale,
  colors,
  isAnimated,
  theme,
}: Props) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

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
      count > LINE_ANIMATION_FAST_COUNT
        ? LINE_ANIMATION_FAST_DURATION
        : LINE_ANIMATION_SLOW_DURATION - count * LINE_ANIMATION_DURATION_STEP;

    return (
      Math.round(duration / LINE_ANIMATION_DURATION_STEP) *
      LINE_ANIMATION_DURATION_STEP
    );
  }, [stackedValues.length]);

  return (
    <g transform={transform} className={styles.Group} aria-hidden="true">
      {stackedValues.map((data, index) => {
        return (
          <Area
            activeLineIndex={activeLineIndex}
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
