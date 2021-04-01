import React from 'react';
import {ScaleBand} from 'd3-scale';
import {classNames} from '@shopify/css-utilities';

import {
  TICK_SIZE,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  DEFAULT_LABEL_RATIO,
  SPACING_BASE_TIGHT,
} from '../../constants';
import {RightAngleTriangle} from '../../utilities';

import styles from './BarChartXAxis.scss';

interface XAxisDetails {
  maxXLabelHeight: number;
  maxDiagonalLabelLength: number;
  needsDiagonalLabels: boolean;
  maxWidth: number;
}

export function BarChartXAxis({
  labels,
  xScale,
  fontSize,
  showFewerLabels,
  xAxisDetails,
  textColor,
  axisColor,
  leftAlignLabels,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  fontSize: number;
  showFewerLabels: boolean;
  xAxisDetails: XAxisDetails;
  textColor?: string;
  axisColor?: string;
  leftAlignLabels?: boolean;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();
  const {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    maxWidth,
  } = xAxisDetails;

  // only include overflow treatment if max label is over a certain length
  const truncateLabels = maxDiagonalLabelLength > 18;

  const diagonalLabelOffset = new RightAngleTriangle({
    sideC: maxDiagonalLabelLength,
    sideA: maxXLabelHeight,
  }).getOppositeLength();

  const transform = needsDiagonalLabels
    ? `translate(${-diagonalLabelOffset -
        SPACING_BASE_TIGHT / 2} ${maxXLabelHeight +
        SPACING_EXTRA_TIGHT / 2}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${maxWidth / 2} ${SPACING_TIGHT})`;

  const textHeight = needsDiagonalLabels
    ? LINE_HEIGHT
    : maxXLabelHeight + SPACING_EXTRA_TIGHT;
  const textWidth = needsDiagonalLabels ? maxDiagonalLabelLength : maxWidth;
  const textContainerClassName = classNames(
    styles.Text,
    needsDiagonalLabels && styles.DiagonalText,
    truncateLabels && styles.Truncated,
  );

  const diagonalLabelSpacePerBar = Math.floor((LINE_HEIGHT * 2) / maxWidth);
  const visibleLabelRatio = needsDiagonalLabels
    ? Math.max(diagonalLabelSpacePerBar, 1)
    : DEFAULT_LABEL_RATIO;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={axisColor ? axisColor : 'rgb(223, 227, 232)'}
      />

      {labels.map(({value, xOffset}, index) => {
        if (showFewerLabels && index % visibleLabelRatio !== 0) {
          return null;
        }
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line
              y2={TICK_SIZE}
              stroke={axisColor ? axisColor : 'rgb(223, 227, 232)'}
              transform={
                leftAlignLabels ? `translate(-${maxWidth / 2 - 1} 0)` : ''
              }
            />
            <foreignObject
              width={textWidth}
              height={textHeight}
              transform={transform}
            >
              <div
                className={textContainerClassName}
                style={{
                  fontSize,
                  color: textColor,
                  textAlign: leftAlignLabels ? 'left' : 'center',
                }}
              >
                {value}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </React.Fragment>
  );
}
