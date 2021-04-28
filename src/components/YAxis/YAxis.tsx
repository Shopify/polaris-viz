import React from 'react';
import {
  spacingBase,
  spacingExtraTight,
  colorSky,
} from '@shopify/polaris-tokens';

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
  fontSize?: number;
  showGridLines?: boolean;
  gridColor?: string;
  labelColor?: string;
  axisMargin?: number;
  overflowStyle?: boolean;
  labelBackgroundColor?: string;
}

function Axis({
  ticks,
  drawableWidth,
  fontSize = FONT_SIZE,
  gridColor = colorSky,
  showGridLines = true,
  labelColor = DEFAULT_GREY_LABEL,
  axisMargin = 0,
  overflowStyle = false,
  labelBackgroundColor,
}: Props) {
  const labelWidth = axisMargin - SPACING / 2;
  const labelHeight = fontSize + SPACING / 2;

  const textTransform =
    labelBackgroundColor == null
      ? `translateX(-${spacingBase}) translateY(${spacingExtraTight})`
      : `translateX(-${axisMargin / 2}px) translateY(${spacingExtraTight})`;

  const path = `m ${LABEL_RADIUS} 0
    h ${labelWidth - LABEL_RADIUS * 2}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 ${LABEL_RADIUS} ${LABEL_RADIUS}
    v ${labelHeight - LABEL_RADIUS * 2}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 -${LABEL_RADIUS} ${LABEL_RADIUS}
    H${LABEL_RADIUS}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 -${LABEL_RADIUS} -${LABEL_RADIUS}
    V${LABEL_RADIUS}
    a ${LABEL_RADIUS} ${LABEL_RADIUS} 0 0 1 ${LABEL_RADIUS} -${LABEL_RADIUS}
    z`;

  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <React.Fragment key={value}>
            <g
              transform={`translate(${
                overflowStyle ? 0 : axisMargin
              },${yOffset})`}
            >
              {showGridLines ? (
                <line x2={drawableWidth} stroke={gridColor} />
              ) : null}
            </g>
            <g transform={`translate(${axisMargin},${yOffset})`}>
              {labelBackgroundColor ? (
                <path
                  d={path}
                  fill={labelBackgroundColor}
                  style={{
                    transform: `translateX(-${labelWidth / 2 +
                      axisMargin / 2}px) translateY(-${labelHeight / 2}px)`,
                  }}
                />
              ) : null}
              <text
                aria-hidden
                style={{
                  fontSize: `${fontSize ? fontSize : FONT_SIZE}px`,
                  textAnchor: labelBackgroundColor == null ? 'end' : 'middle',
                  transform: textTransform,
                  fill: labelColor,
                }}
              >
                {formattedValue}
              </text>
            </g>
          </React.Fragment>
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
