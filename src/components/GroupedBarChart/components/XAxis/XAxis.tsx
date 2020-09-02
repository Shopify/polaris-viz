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
} from 'components/constants';

import styles from './XAxis.scss';

export function XAxis({
  labels,
  xScale,
  fontSize,
  showFewerLabels,
  needsDiagonalLabels,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showFewerLabels: boolean;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  const transform = needsDiagonalLabels
    ? `translate(${SPACING_EXTRA_TIGHT} ${SPACING_LOOSE}) rotate(${DIAGONAL_ANGLE})`
    : `translate(0 ${SPACING_TIGHT + SPACING})`;

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
            <text
              className={styles.Text}
              textAnchor={needsDiagonalLabels ? 'end' : 'middle'}
              transform={transform}
              style={{
                fontSize,
              }}
            >
              {value}
            </text>
          </g>
        );
      })}
    </React.Fragment>
  );
}
