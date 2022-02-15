import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels} from './hooks/useLabels';
import {Line} from './components/Line';
import {shouldSkipLabel} from './utilities/should-skip-label';

interface LabelsProps {
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number>;
  minimalLabelIndexes?: number[];
  theme?: string;
}

export function LineChartLabels({
  chartX,
  chartY,
  labels,
  labelWidth,
  minimalLabelIndexes,
  onHeightChange,
  theme,
  xScale,
}: LabelsProps) {
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
            <Line line={line} index={index} theme={theme} />
          </g>
        );
      })}
    </React.Fragment>
  );
}
