import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleBand} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../Labels';
import {TextLine} from '../TextLine';

export interface BarChartXAxisLabelsProps {
  chartX: number;
  chartY: number;
  chartHeight: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleBand<string>;
  reducedLabelIndexes?: number[];
  theme: string;
}

export function BarChartXAxisLabels({
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  theme,
  xScale,
}: BarChartXAxisLabelsProps) {
  const {lines} = useLabels({
    labels,
    targetWidth: labelWidth,
    onHeightChange,
    chartHeight,
  });

  return (
    <g aria-hidden>
      {lines.map((line, index) => {
        if (shouldSkipLabel(index, reducedLabelIndexes)) {
          return null;
        }

        const x = xScale(index.toString()) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            <TextLine line={line} index={index} theme={theme} />
          </g>
        );
      })}
    </g>
  );
}
