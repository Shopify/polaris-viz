import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleBand} from 'd3-scale';

import {useLabels, TextLine, shouldSkipLabel} from '../Labels';

export interface BarChartXAxisLabelsProps {
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleBand<string>;
  minimalLabelIndexes?: number[];
  theme?: string;
}

export function BarChartXAxisLabels({
  chartX,
  chartY,
  labels,
  labelWidth,
  minimalLabelIndexes,
  onHeightChange,
  theme,
  xScale,
}: BarChartXAxisLabelsProps) {
  const {lines} = useLabels({
    labels,
    targetWidth: labelWidth,
    onHeightChange,
  });

  return (
    <React.Fragment>
      {lines.map((line, index) => {
        if (shouldSkipLabel(index, minimalLabelIndexes)) {
          return null;
        }

        const x = xScale(index.toString()) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            <TextLine line={line} index={index} theme={theme} />
          </g>
        );
      })}
    </React.Fragment>
  );
}
