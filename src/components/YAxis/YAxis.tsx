import React from 'react';
import {spacingBase, spacingExtraTight} from '@shopify/polaris-tokens';

import {FONT_SIZE} from '../../constants';

import styles from './YAxis.scss';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
  fontSize?: number;
  textColor?: string;
  axisColor?: string;
}

function Axis({
  ticks,
  drawableWidth,
  fontSize,
  textColor,
  axisColor = 'rgb(223, 227, 232)',
}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            <line
              x2={drawableWidth}
              className={styles.Line}
              style={{stroke: axisColor ? axisColor : ''}}
            />
            <text
              aria-hidden
              className={styles.Text}
              style={{
                fontSize: `${fontSize ? fontSize : FONT_SIZE}px`,
                textAnchor: 'end',
                transform: `translateX(-${spacingBase}) translateY(${spacingExtraTight})`,
                fill: textColor,
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
