import React from 'react';
import {colorSky, colorInkLighter, spacingLoose} from '@shopify/polaris-tokens';
import {TICK_SIZE, LINE_HEIGHT} from '../../constants';

export function XAxis({
  labels,
  range,
}: {
  range: number[];
  labels: {value: string[]; xOffset: number}[];
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
              {value.map((labelPart, index) => (
                <tspan key={labelPart} x={0} dy={index === 0 ? 0 : LINE_HEIGHT}>
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
