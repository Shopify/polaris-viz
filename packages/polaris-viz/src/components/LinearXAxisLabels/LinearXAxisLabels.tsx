import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../Labels';
import {TextLine} from '../TextLine';

interface LinearXAxisLabelsProps {
  chartHeight: number;
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number>;
  reducedLabelIndexes?: number[];
  theme: string;
}

export function LinearXAxisLabels({
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  theme,
  xScale,
}: LinearXAxisLabelsProps) {
  const {lines} = useLabels({
    chartHeight,
    labels,
    onHeightChange,
    targetWidth: labelWidth,
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
