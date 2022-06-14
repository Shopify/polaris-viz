import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../../Labels';
import {TextLine} from '../../TextLine';

export interface ComboChartXAxisLabelsProps {
  chartX: number;
  chartY: number;
  chartHeight: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number>;
  reducedLabelIndexes?: number[];
  theme: string;
}

export function ComboChartXAxisLabels({
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  theme,
  xScale,
}: ComboChartXAxisLabelsProps) {
  const {lines} = useLabels({
    labels,
    targetWidth: labelWidth,
    onHeightChange,
    chartHeight,
  });

  return (
    <React.Fragment>
      {lines.map((line, index) => {
        if (shouldSkipLabel(index, reducedLabelIndexes)) {
          return null;
        }

        const x = xScale(index) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            <TextLine line={line} index={index} theme={theme} />
          </g>
        );
      })}
    </React.Fragment>
  );
}
