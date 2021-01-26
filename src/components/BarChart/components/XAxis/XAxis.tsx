import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  DEFAULT_LABEL_RATIO,
  SPACING_BASE_TIGHT,
} from '../../constants';
import {RightAngleTriangle} from '../../../../utilities';

import styles from './XAxis.scss';

export function XAxis({
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
  xAxisDetails: {
    maxXLabelHeight: number;
    maxDiagonalLabelLength: number;
    needsDiagonalLabels: boolean;
  };
}) {
  const [xScaleMin, xScaleMax] = xScale.range();
  const {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
  } = xAxisDetails;

  const diagonalLabelOffset = new RightAngleTriangle({
    sideC: maxDiagonalLabelLength,
    sideA: maxXLabelHeight,
  }).getOppositeLength();

  const transform = needsDiagonalLabels
    ? `translate(${-diagonalLabelOffset -
        SPACING_BASE_TIGHT} ${maxXLabelHeight +
        SPACING_EXTRA_TIGHT}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${xScale.bandwidth() / 2} ${SPACING_TIGHT})`;

  const textHeight = needsDiagonalLabels ? LINE_HEIGHT : maxXLabelHeight;
  const textWidth = needsDiagonalLabels
    ? maxDiagonalLabelLength
    : xScale.bandwidth();
  const textContainerClassName = needsDiagonalLabels
    ? styles.DiagonalText
    : styles.Text;

  const diagonalLabelSpacePerBar = Math.floor(
    (LINE_HEIGHT * 2) / xScale.bandwidth(),
  );
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
