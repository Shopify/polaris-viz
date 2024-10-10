import {Fragment} from 'react';
import type {ScaleBand} from 'd3-scale';

import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine, useLabels} from '../../Labels';
import {TextLine} from '../../TextLine';

const LINE_GAP = 5;
const LINE_PADDING = 10;
const GROUP_OFFSET = 10;
const LABEL_FONT_SIZE = 12;

export interface FunnelChartXAxisLabelsProps {
  formattedValues: string[];
  labels: string[];
  labelWidth: number;
  percentages: string[];
  xScale: ScaleBand<string>;
}

export function FunnelChartXAxisLabels({
  formattedValues,
  labels,
  labelWidth,
  percentages,
  xScale,
}: FunnelChartXAxisLabelsProps) {
  const {lines} = useLabels({
    allowLineWrap: true,
    align: 'left',
    fontSize: LABEL_FONT_SIZE,
    labels,
    targetWidth: labelWidth - GROUP_OFFSET * 2,
  });

  return (
    <Fragment>
      {lines.map((line, index) => {
        const x = xScale(index.toString()) ?? 0;

        const firstLabelHeight = line.reduce(
          (acc, {height}) => acc + height,
          0,
        );

        const percentWidth = estimateStringWidthWithOffset(
          percentages[index],
          14,
          650,
        );

        return (
          <g
            transform={`translate(${
              index === 0 ? x : x + GROUP_OFFSET
            },${GROUP_OFFSET})`}
            key={index}
          >
            <TextLine
              color="rgba(31, 33, 36, 1)"
              line={line}
              index={index}
              fontSize={LABEL_FONT_SIZE}
            />

            <g transform={`translate(0,${firstLabelHeight + LINE_GAP})`}>
              <SingleTextLine
                color="rgba(31, 33, 36, 1)"
                text={percentages[index]}
                targetWidth={labelWidth}
                textAnchor="left"
                fontSize={14}
                fontWeight={650}
              />
              <SingleTextLine
                color="rgba(97, 97, 97, 1)"
                text={formattedValues[index]}
                targetWidth={labelWidth}
                x={percentWidth + LINE_PADDING}
                // Fix visual centering
                y={1}
                textAnchor="left"
                fontSize={11}
              />
            </g>
          </g>
        );
      })}
    </Fragment>
  );
}
