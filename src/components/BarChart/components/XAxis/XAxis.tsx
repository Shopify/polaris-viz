import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  SPACING_LOOSE,
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
  xLabelHeight,
  angledLabelHeight,
  longestLabelLength,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showFewerLabels: boolean;
  xLabelHeight: number;
  angledLabelHeight: number;
  longestLabelLength: number;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  const diagonalShift = Math.sqrt(
    Math.pow(longestLabelLength, 2) - Math.pow(angledLabelHeight, 2),
  );

  const transform = needsDiagonalLabels
    ? `translate(${-diagonalShift} ${angledLabelHeight -
        SPACING_EXTRA_TIGHT}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${xScale.bandwidth() / 2} 0)`;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        if (showFewerLabels && index % 2 !== 0) {
          return null;
        }
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <foreignObject
              // style={{background: 'red'}}
              //width is what determines if there is overflow
              width={
                needsDiagonalLabels ? longestLabelLength : xScale.bandwidth()
              }
              height={needsDiagonalLabels ? LINE_HEIGHT : xLabelHeight}
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
