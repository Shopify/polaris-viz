import {Fragment} from 'react';
import type {ScaleBand} from 'd3-scale';

import {LINE_HEIGHT} from '../../../constants';
import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine} from '../../Labels';

import {ScaleIcon} from './ScaleIcon';

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
  shouldApplyScaling: boolean;
}

export function FunnelChartXAxisLabels({
  formattedValues,
  labels,
  labelWidth,
  percentages,
  xScale,
  shouldApplyScaling,
}: FunnelChartXAxisLabelsProps) {
  const targetWidth = labelWidth - GROUP_OFFSET * 3;

  return (
    <Fragment>
      {labels.map((label, index) => {
        const x = xScale(index.toString()) ?? 0;
        const showScaleIcon = index === 0 && shouldApplyScaling;

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
            {showScaleIcon && (
              <g transform="translate(0, -3)">
                <ScaleIcon />
              </g>
            )}
            <SingleTextLine
              color={TEXT_COLOR}
              text={label}
              targetWidth={targetWidth}
              textAnchor="start"
              fontSize={LABEL_FONT_SIZE}
              x={showScaleIcon ? 20 : 0}
            />

            <g transform={`translate(0,${LINE_HEIGHT + LINE_GAP})`}>
              <SingleTextLine
                color={TEXT_COLOR}
                text={percentages[index]}
                targetWidth={targetWidth}
                textAnchor="start"
                fontSize={PERCENT_FONT_SIZE}
                fontWeight={PERCENT_FONT_WEIGHT}
              />
              <SingleTextLine
                color={VALUE_COLOR}
                text={formattedValues[index]}
                targetWidth={targetWidth}
                x={percentWidth + LINE_PADDING}
                y={1}
                textAnchor="start"
                fontSize={VALUE_FONT_SIZE}
              />
            </g>
          </g>
        );
      })}
    </Fragment>
  );
}
