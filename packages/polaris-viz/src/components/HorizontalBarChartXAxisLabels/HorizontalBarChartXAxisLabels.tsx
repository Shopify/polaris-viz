import type {Dispatch, SetStateAction} from 'react';
import {Fragment} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {useLabels} from '../Labels/hooks/useLabels';
import {TextLine} from '../TextLine/TextLine';

interface HorizontalBarChartXAxisLabelsProps {
  allowLineWrap: boolean;
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
    labels,
    onHeightChange,
    targetWidth: labelWidth,
  });

  return (
    <Fragment>
      {lines.map((line, index) => {
        const x = xScale(ticks[index]) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            <TextLine line={line} index={index} />
          </g>
        );
      })}
    </Fragment>
  );
}
