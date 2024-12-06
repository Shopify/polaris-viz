import {useCallback, useMemo} from 'react';
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
  const tallestBarHeight = useMemo(
    () => yScale(Math.max(...values)),
    [yScale, values],
  );
  const smallestBarHeight = useMemo(
    () => yScale(Math.min(...values)),
    [yScale, values],
  );

  const smallestToTallestBarRatio = useMemo(
    () => smallestBarHeight / tallestBarHeight,
    [smallestBarHeight, tallestBarHeight],
  );

  const shouldApplyScaling = useMemo(
    () => smallestToTallestBarRatio <= SCALING_RATIO_THRESHOLD,
    [smallestToTallestBarRatio],
  );

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const barHeight = yScale(rawValue);

      if (!shouldApplyScaling || barHeight === tallestBarHeight) {
        return barHeight;
      }

      const currentRatio = smallestBarHeight / tallestBarHeight;
      const scaleFactor = MINIMUM_SEGMENT_HEIGHT_RATIO / currentRatio;

      // Ensure we don't scale larger than the first segment
      return Math.min(barHeight * scaleFactor, tallestBarHeight * 0.9);
    },
    [yScale, shouldApplyScaling, smallestBarHeight, tallestBarHeight],
  );

  return {
    shouldApplyScaling,
    getBarHeight,
  };
}
