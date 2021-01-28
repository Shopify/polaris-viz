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
}

function Axis({ticks, drawableWidth, fontSize}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            <line x2={drawableWidth} className={styles.Line} />
            <text
              className={styles.Text}
              style={{
                fontSize: `${fontSize ? fontSize : FONT_SIZE}px`,
                textAnchor: 'end',
                transform: `translateX(-${spacingBase}) translateY(${spacingExtraTight})`,
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
