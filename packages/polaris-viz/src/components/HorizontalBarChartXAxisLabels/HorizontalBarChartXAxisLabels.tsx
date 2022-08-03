import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels} from '../Labels';
import {TextLine} from '../TextLine';

interface HorizontalBarChartXAxisLabelsProps {
  allowLineWrap: boolean;
  chartHeight: number;
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number>;
  ticks: number[];
}

export function HorizontalBarChartXAxisLabels({
  allowLineWrap,
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  ticks,
  xScale,
}: HorizontalBarChartXAxisLabelsProps) {
  const {lines} = useLabels({
    allowLineWrap,
    chartHeight,
    labels,
    onHeightChange,
    targetWidth: labelWidth,
  });

  return (
    <React.Fragment>
      {lines.map((line, index) => {
        const x = xScale(ticks[index]) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            <TextLine line={line} index={index} />
          </g>
        );
      })}
    </React.Fragment>
  );
}
