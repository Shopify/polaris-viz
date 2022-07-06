import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleBand} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../../Labels';
import {TextLine} from '../../TextLine';

import {FunnelChartXAxisArrows} from './FunnelChartXAxisArrows';

export interface FunnelChartXAxisLabelsProps {
  chartX: number;
  chartY: number;
  chartHeight: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleBand<string>;
  reducedLabelIndexes?: number[];
}

export function FunnelChartXAxisLabels({
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  xScale,
}: FunnelChartXAxisLabelsProps) {
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

        const x = xScale(index.toString()) ?? 0;

        return (
          <g key={`label-group-${index}`}>
            {index === 0 ? null : (
              <FunnelChartXAxisArrows
                chartHeight={chartHeight}
                onHeightChange={onHeightChange}
                x={x}
                index={index}
                chartX={chartX}
                chartY={chartY}
                labelWidth={labelWidth}
              />
            )}
            <g transform={`translate(${chartX + x},${chartY})`} key={index}>
              <TextLine line={line} index={index} />
            </g>
          </g>
        );
      })}
    </React.Fragment>
  );
}
