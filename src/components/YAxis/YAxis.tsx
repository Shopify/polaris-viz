import React from 'react';
import {spacingExtraTight, colorSky} from '@shopify/polaris-tokens';

import {
  FONT_SIZE,
  DEFAULT_GREY_LABEL,
  SPACING,
  LABEL_RADIUS,
} from '../../constants';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
  axisMargin: number;
  fontSize?: number;
  showGridLines?: boolean;
  gridColor?: string;
  labelColor?: string;
  labelBackgroundColor?: string;
}

function Axis({
  ticks,
  drawableWidth,
  fontSize = FONT_SIZE,
  gridColor = colorSky,
  showGridLines = true,
  labelColor = DEFAULT_GREY_LABEL,
  labelBackgroundColor,
  axisMargin,
}: Props) {
  const labelWidth = axisMargin - SPACING / 2;
  const labelHeight = fontSize + SPACING / 2;

  const path = `
    m ${LABEL_RADIUS} 0
    h ${labelWidth - LABEL_RADIUS * 2}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 ${LABEL_RADIUS} ${LABEL_RADIUS}
    v ${labelHeight - LABEL_RADIUS * 2}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 -${LABEL_RADIUS} ${LABEL_RADIUS}
    H${LABEL_RADIUS}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 -${LABEL_RADIUS} -${LABEL_RADIUS}
    V${LABEL_RADIUS}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 ${LABEL_RADIUS} -${LABEL_RADIUS}
    z
  `;

  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            {showGridLines ? (
              <line x2={drawableWidth} stroke={gridColor} />
            ) : null}

            {labelBackgroundColor ? (
              <path
                d={path}
                fill={labelBackgroundColor}
                style={{
                  transform: `translateX(-${labelWidth +
                    SPACING / 4}px) translateY(-${labelHeight / 2}px)`,
                }}
              />
            ) : null}
            <text
              aria-hidden
              style={{
                fontSize: `${fontSize}px`,
                textAnchor: 'middle',
                transform: `translateX(-${axisMargin /
                  2}px) translateY(${spacingExtraTight})`,
                fill: labelColor,
              }}
            >
              {formattedValue}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
