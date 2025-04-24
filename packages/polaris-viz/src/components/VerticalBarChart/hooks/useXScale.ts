import {useMemo} from 'react';
import {scaleBand, scaleLog} from 'd3-scale';
import {clamp} from '@shopify/polaris-viz-core';

import type {SortedBarChartData} from '../../../types';

// Max number of groups taken into consideration to
// calculate the gap size. If there are more,
// it will use the same gap size as 9 groups.
const MAX_GROUPS = 9;
// Same as above but min. If 1 group it uses the
// same gap size as 2 groups.
const MIN_GROUPS = 2;
// Min and Max gap size for the scale gap.
const MAX_GAP = 0.5;
const MIN_GAP = 0.25;

export interface Props {
  drawableWidth: number;
  data: SortedBarChartData;
  labels: string[];
  gapOverride?: number | null;
}

export function useXScale({drawableWidth, data, labels, gapOverride}: Props) {
  const gapScale = scaleLog()
    .range([MIN_GAP, MAX_GAP])
    .domain([MIN_GROUPS, MAX_GROUPS]);

  const baseGap = Math.min(gapScale(data.length), MAX_GAP);

  // If gapOverride is provided, calculate the equivalent gap value
  // by dividing the pixel gap by the step size
  const gap = clamp({
    amount:
      gapOverride != null
        ? gapOverride / (drawableWidth / data.length)
        : baseGap,
    min: 0,
  });

  const xScale = scaleBand()
    .range([0, drawableWidth])
    .paddingInner(gap)
    .paddingOuter(gap / 2)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return labels.map((label, index) => {
      const barXPosition = xScale(index.toString());
      const xOffset =
        barXPosition == null ? barWidthOffset : barWidthOffset + barXPosition;

      return {
        value: label,
        xOffset,
      };
    });
  }, [labels, xScale, barWidthOffset]);

  const gapWidth = useMemo(() => {
    return xScale.step() - xScale.bandwidth();
  }, [xScale]);

  return {xScale, xAxisLabels, gapWidth};
}
