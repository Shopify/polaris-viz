import {useCallback} from 'react';
import type {ScaleLinear} from 'd3-scale';

// Threshold to determine if we should scale the segments, i.e if the smallest segment is less than 10% of the tallest segment
export const SCALING_RATIO_THRESHOLD = 0.1;

// Minimum height ratio between smallest and tallest segments
export const MINIMUM_SEGMENT_HEIGHT_RATIO = 0.25;

interface UseFunnelBarScalingProps {
  yScale: ScaleLinear<number, number>;
  values: number[];
}

export function useFunnelBarScaling({
  yScale,
  values,
}: UseFunnelBarScalingProps) {
  const maxValue = Math.max(...values);
  const smallestNonZeroValue = Math.min(...values.filter((value) => value > 0));
  const tallestBarHeight = yScale(maxValue);
  const smallestBarHeight = yScale(smallestNonZeroValue);
  const smallestToTallestBarRatio = smallestBarHeight / tallestBarHeight;
  const shouldApplyScaling =
    smallestToTallestBarRatio <= SCALING_RATIO_THRESHOLD;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const sanitizedValue = Math.max(0, rawValue);
      const barHeight = sanitizedValue === 0 ? 0 : yScale(sanitizedValue);
      if (
        !shouldApplyScaling ||
        barHeight === tallestBarHeight ||
        sanitizedValue === 0
      ) {
        return barHeight;
      }

      // Calculate the ratio of this segment's value compared to the maximum
      const valueRatio = sanitizedValue / maxValue;

      /*
       * Use logarithmic scaling to make small segments more visible in the funnel chart.
       * This helps when values vary greatly (e.g., 1000 vs 10), ensuring smaller
       * segments remain meaningful. The logarithmic scale uses exponential growth
       * rather than linear increments on the y scale, which works well for visualizing
       * large ranges.
       */
      const logBase =
        MINIMUM_SEGMENT_HEIGHT_RATIO **
        (1 / Math.log(smallestNonZeroValue / maxValue));
      const scaledRatio = logBase ** Math.log(valueRatio);

      return (
        tallestBarHeight * Math.max(scaledRatio, MINIMUM_SEGMENT_HEIGHT_RATIO)
      );
    },
    [
      yScale,
      shouldApplyScaling,
      tallestBarHeight,
      maxValue,
      smallestNonZeroValue,
    ],
  );

  return {
    shouldApplyScaling,
    getBarHeight,
  };
}
