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
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showFewerLabels: boolean;
  xLabelHeight: number;
  angledLabelHeight: number;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  const transform = needsDiagonalLabels
    ? // make these numbers real
      `translate(-${xScale.bandwidth() - 20} ${60}) rotate(${DIAGONAL_ANGLE})`
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
              // different for diagonmal
              //width is what determines if there is overflow
              width={
                needsDiagonalLabels ? angledLabelHeight : xScale.bandwidth()
              }
              height={needsDiagonalLabels ? 30 : xLabelHeight}
              transform={transform}
            >
              <p
                className={
                  needsDiagonalLabels ? styles.DiagonalText : styles.Text
                }
                style={{
                  fontSize,
                }}
              >
                {value}
              </p>
            </foreignObject>
          </g>
        );
      })}
    </React.Fragment>
  );
}
