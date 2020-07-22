import React from 'react';
import {colorSky, colorInkLighter} from '@shopify/polaris-tokens';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  SPACING_LOOSE,
} from '../../constants';

export function XAxis({
  labels,
  xScale,
  fontSize,
  showAlternateLabels,
  needsDiagonalLabels,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showAlternateLabels: boolean;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  const transform = needsDiagonalLabels
    ? `translate(${SPACING_EXTRA_TIGHT} ${SPACING_LOOSE}) rotate(-40)`
    : `translate(0 ${SPACING_TIGHT + SPACING})`;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        if (showAlternateLabels && index % 2 !== 0) {
          return null;
        }

        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <text
              fill={colorInkLighter}
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
