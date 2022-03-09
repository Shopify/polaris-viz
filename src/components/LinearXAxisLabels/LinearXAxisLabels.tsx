import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels, TextLine, shouldSkipLabel} from '../Labels';

interface LinearXAxisLabelsProps {
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number>;
  minimalLabelIndexes?: number[];
  theme?: string;
}

export function LinearXAxisLabels({
  chartX,
  chartY,
  labels,
  labelWidth,
  minimalLabelIndexes,
  onHeightChange,
  theme,
  xScale,
}: LinearXAxisLabelsProps) {
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
