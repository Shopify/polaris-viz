import { Fragment, Dispatch, SetStateAction } from 'react';
import type {ScaleBand} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../../Labels';
import {TextLine} from '../../TextLine';

import {FunnelChartXAxisArrows} from './FunnelChartXAxisArrows';

export interface FunnelChartXAxisLabelsProps {
  allowLineWrap: boolean;
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleBand<string>;
  reducedLabelIndexes?: number[];
}

export function FunnelChartXAxisLabels({
  allowLineWrap,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  xScale,
}: FunnelChartXAxisLabelsProps) {
  const {lines} = useLabels({
    allowLineWrap,
    labels,
    targetWidth: labelWidth,
    onHeightChange,
  });

  return (
    <Fragment>
      {lines.map((line, index) => {
        if (shouldSkipLabel(index, reducedLabelIndexes)) {
          return null;
        }

        const x = xScale(index.toString()) ?? 0;

        return (
          <g key={`label-group-${index}`}>
            {index === 0 ? null : (
              <FunnelChartXAxisArrows
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
    </Fragment>
  );
}
