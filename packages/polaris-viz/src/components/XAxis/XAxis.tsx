import type {Dispatch, SetStateAction} from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import {scaleLinear} from 'd3-scale';

import {useLabels} from '../Labels/hooks/useLabels';
import {shouldSkipLabel} from '../Labels/utilities/shouldSkipLabel';
import {TextLine} from '../TextLine/TextLine';

interface XAxisProps {
  allowLineWrap: boolean;
  labels: string[];
  labelWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  x: number;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
  y: number;
  ariaHidden?: boolean;
  isLinearChart?: boolean;
  reducedLabelIndexes?: number[];
}

export function XAxis({
  allowLineWrap,
  ariaHidden = false,
  isLinearChart = false,
  labels,
  labelWidth,
  onHeightChange,
  reducedLabelIndexes,
  x,
  xScale,
  y,
}: XAxisProps) {
  const {lines} = useLabels({
    labels,
    onHeightChange,
    targetWidth: labelWidth,
    allowLineWrap,
  });

  return (
    <g aria-hidden>
      {lines.map((line, index) => {
        // Skip last labels for linear charts so they
        // don't spill outside the chart area.
        const skipLastLabel =
          isLinearChart && labels.length > 1 && index === labels.length - 1;

        if (shouldSkipLabel(index, reducedLabelIndexes) || skipLastLabel) {
          return null;
        }

        const xPosition = getXPosition(index, xScale);

        return (
          <g
            transform={`translate(${x + (xPosition ?? 0)},${y})`}
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
