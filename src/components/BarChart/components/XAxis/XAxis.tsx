import React from 'react';
import {colorSky, colorInkLighter, spacingLoose} from '@shopify/polaris-tokens';

const TICK_SIZE = 6;

export function XAxis({
  labels,
  range,
}: {
  range: number[];
  labels: {value: string; xOffset: number}[];
}) {
  //to do:
  // adjust font-size based on space
  // slant the label if it would be a better fit
  // truncate strings if they are still too long

  const [xScaleMin, xScaleMax] = range;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {labels.map(({value, xOffset}, index) => {
        if (value == null) {
          return null;
        }

        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <text
              fill={colorInkLighter}
              style={{
                fontSize: '12px',
                textAnchor: 'middle',
                transform: `translateY(${spacingLoose})`,
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
