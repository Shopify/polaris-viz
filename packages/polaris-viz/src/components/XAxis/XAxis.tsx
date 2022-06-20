import React, {Dispatch, SetStateAction} from 'react';
import {ScaleBand, scaleLinear, ScaleLinear} from 'd3-scale';

import {useLabels, shouldSkipLabel} from '../Labels';
import {TextLine} from '../TextLine';

interface XAxisProps {
  chartHeight: number;
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
  reducedLabelIndexes?: number[];
  theme: string;
  ariaHidden?: boolean;
}

export function XAxis({
  chartHeight,
  chartX,
  chartY,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  theme,
  xScale,
  ariaHidden = false,
}: XAxisProps) {
  const {lines} = useLabels({
    chartHeight,
    labels,
    onHeightChange,
    targetWidth: labelWidth,
  });

  return (
    <React.Fragment>
      {lines.map((line, index = 0) => {
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
            <TextLine line={line} index={index} theme={theme} />
          </g>
        );
      })}
    </React.Fragment>
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
