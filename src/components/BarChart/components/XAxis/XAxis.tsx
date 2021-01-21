import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
} from '../../constants';

import styles from './XAxis.scss';

export function XAxis({
  labels,
  xScale,
  fontSize,
  showFewerLabels,
  needsDiagonalLabels,
  labelHeight,
  angledLabelHeight,
  maxDiagonalLabelLength,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showFewerLabels: boolean;
  labelHeight: number;
  angledLabelHeight: number;
  maxDiagonalLabelLength: number;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  // use use Pythagorean Theorem to determine how much label needs to be moved
  // for the end to line up with the tick mark
  // we find the side of the triangle that represents the distance between the start of the bar
  // and the start of the label ?
  const diagonalShift = Math.sqrt(
    Math.pow(maxDiagonalLabelLength, 2) - Math.pow(angledLabelHeight, 2),
  );

  const labelRatio = needsDiagonalLabels
    ? Math.max(Math.floor((LINE_HEIGHT * 2) / xScale.bandwidth()), 1)
    : 2;

  const transform = needsDiagonalLabels
    ? `translate(${-diagonalShift - SPACING_EXTRA_TIGHT} ${angledLabelHeight +
        SPACING_EXTRA_TIGHT}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${xScale.bandwidth() / 2} ${SPACING_TIGHT})`;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        if (showFewerLabels && index % labelRatio !== 0) {
          return null;
        }
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <foreignObject
              width={
                needsDiagonalLabels
                  ? maxDiagonalLabelLength
                  : xScale.bandwidth()
              }
              height={needsDiagonalLabels ? LINE_HEIGHT : labelHeight}
              transform={transform}
            >
              <div
                className={
                  needsDiagonalLabels ? styles.DiagonalText : styles.Text
                }
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
