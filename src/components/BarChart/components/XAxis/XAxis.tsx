import React from 'react';
import {colorSky, colorInkLighter} from '@shopify/polaris-tokens';

import {TICK_SIZE, LINE_HEIGHT, SPACING_TIGHT, SPACING} from '../../constants';

import styles from './XAxis.scss';

export function XAxis({
  labels,
  range,
  fontSize,
}: {
  range: number[];
  labels: {value: string[]; xOffset: number}[];
  fontSize: number;
}) {
  const [xScaleMin, xScaleMax] = range;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <text
              fill={colorInkLighter}
              className={styles.Text}
              style={{
                transform: `translateY(${SPACING_TIGHT + SPACING}px)`,
                fontSize,
              }}
            >
              {value.map((labelPart, index) => (
                <tspan
                  key={`${labelPart}${index}`}
                  x={0}
                  dy={index === 0 ? 0 : LINE_HEIGHT}
                >
                  {labelPart}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </React.Fragment>
  );
}
