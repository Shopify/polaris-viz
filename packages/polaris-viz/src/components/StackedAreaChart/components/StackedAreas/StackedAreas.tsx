import {Fragment, useMemo, useState} from 'react';
import {area, line} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';
import type {Color} from '@shopify/polaris-viz-core';
import {
  curveStepRounded,
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  usePrevious,
} from '@shopify/polaris-viz-core';

import {
  LINE_ANIMATION_FAST_COUNT,
  LINE_ANIMATION_FAST_DURATION,
  LINE_ANIMATION_SLOW_DURATION,
  LINE_ANIMATION_DURATION_STEP,
} from '../../../../constants';
import type {StackedSeries} from '../../../../types';
import {useTheme, useWatchColorVisionEvents} from '../../../../hooks';
import {AnimatedArea, Area} from '../Area';

interface Props {
  colors: Color[];
  stackedValues: StackedSeries[];
  zeroLineValues: StackedSeries[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  theme: string;
}

export function StackedAreas({
  stackedValues,
  xScale,
  yScale,
  colors,
  theme,
  zeroLineValues,
}: Props) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const previousStackedValues = usePrevious(stackedValues);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

  const selectedTheme = useTheme(theme);

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
    <Fragment>
      {stackedValues.map((data, index) => {
        const dataIsValidForAnimation =
          !previousStackedValues ||
          data.length === previousStackedValues[index].length;

        const AreaComponent = dataIsValidForAnimation ? AnimatedArea : Area;

        return (
          <AreaComponent
            activeLineIndex={activeLineIndex}
            animationIndex={index}
            areaGenerator={areaGenerator}
            colors={colors}
            data={data}
            zeroLineValues={zeroLineValues[index]}
            duration={duration}
            id={id}
            index={index}
            key={`${id}-${index}`}
            lineGenerator={lineGenerator}
            selectedTheme={selectedTheme}
          />
        );
      })}
    </Fragment>
  );
}
