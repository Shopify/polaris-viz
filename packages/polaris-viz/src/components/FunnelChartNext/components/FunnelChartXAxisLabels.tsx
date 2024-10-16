import {Fragment} from 'react';
import type {ScaleBand} from 'd3-scale';

import {LINE_HEIGHT} from '../../../constants';
import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine} from '../../Labels';

const LINE_GAP = 5;
const LINE_PADDING = 10;
const GROUP_OFFSET = 10;
const LABEL_FONT_SIZE = 12;
const PERCENT_FONT_SIZE = 14;
const PERCENT_FONT_WEIGHT = 650;
const VALUE_FONT_SIZE = 11;

const TEXT_COLOR = 'rgba(31, 33, 36, 1)';
const VALUE_COLOR = 'rgba(97, 97, 97, 1)';

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
  const targetWidth = labelWidth - GROUP_OFFSET * 3;

  return (
    <Fragment>
      {labels.map((label, index) => {
        const x = xScale(index.toString()) ?? 0;

        const percentWidth = estimateStringWidthWithOffset(
          percentages[index],
          PERCENT_FONT_SIZE,
          PERCENT_FONT_WEIGHT,
        );

        return (
          <g
            transform={`translate(${
              index === 0 ? x : x + GROUP_OFFSET
            },${GROUP_OFFSET})`}
            key={index}
          >
            <SingleTextLine
              color={TEXT_COLOR}
              text={label}
              targetWidth={targetWidth}
              textAnchor="left"
              fontSize={LABEL_FONT_SIZE}
            />

            <g transform={`translate(0,${LINE_HEIGHT + LINE_GAP})`}>
              <SingleTextLine
                color={TEXT_COLOR}
                text={percentages[index]}
                targetWidth={targetWidth}
                textAnchor="left"
                fontSize={PERCENT_FONT_SIZE}
                fontWeight={PERCENT_FONT_WEIGHT}
              />
              <SingleTextLine
                color={VALUE_COLOR}
                text={formattedValues[index]}
                targetWidth={targetWidth}
                x={percentWidth + LINE_PADDING}
                // Fix visual centering
                y={1}
                textAnchor="left"
                fontSize={VALUE_FONT_SIZE}
              />
            </g>
          </g>
        );
      })}
    </Fragment>
  );
}
