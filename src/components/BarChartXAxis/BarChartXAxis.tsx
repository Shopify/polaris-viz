import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
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
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  fontSize: number;
  showFewerLabels: boolean;
  xAxisDetails: XAxisDetails;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();
  const {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    maxWidth,
  } = xAxisDetails;

  const truncateLabels = needsDiagonalLabels && maxDiagonalLabelLength > 18;

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
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        if (showFewerLabels && index % visibleLabelRatio !== 0) {
          return null;
        }
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <foreignObject
              width={textWidth}
              height={textHeight}
              transform={transform}
            >
              <div
                className={textContainerClassName}
                style={{
                  fontSize,
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
