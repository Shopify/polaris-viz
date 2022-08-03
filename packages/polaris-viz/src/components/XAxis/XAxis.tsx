import React, {Dispatch, SetStateAction} from 'react';
import {ScaleBand, scaleLinear, ScaleLinear} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../Labels';
import {TextLine} from '../TextLine';

interface XAxisProps {
  allowLineWrap: boolean;
  chartHeight: number;
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
  reducedLabelIndexes?: number[];
  ariaHidden?: boolean;
}

export function XAxis({
  ariaHidden = false,
  allowLineWrap,
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  xScale,
}: XAxisProps) {
  const {lines} = useLabels({
    chartHeight,
    labels,
    onHeightChange,
    targetWidth: labelWidth,
    allowLineWrap,
  });

  return (
    <g aria-hidden>
      {lines.map((line, index) => {
        if (shouldSkipLabel(index, reducedLabelIndexes)) {
          return null;
        }

        const x = getXPosition(index, xScale);

        return (
          <g
            transform={`translate(${chartX + (x ?? 0)},${chartY})`}
            key={index}
            aria-hidden={ariaHidden}
          >
            <TextLine line={line} index={index} />
          </g>
        );
      })}
    </g>
  );
}

function getXPosition(
  index: number,
  xScale: ScaleLinear<number, number> | ScaleBand<string>,
) {
  if (xScale instanceof scaleLinear) {
    return (xScale as ScaleLinear<number, number>)(index);
  }

  return (xScale as ScaleBand<string>)(`${index}`);
}
