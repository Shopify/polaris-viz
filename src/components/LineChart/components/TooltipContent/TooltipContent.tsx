import React from 'react';
import type {LineStyle, Color} from 'types';

import {useTheme} from '../../../../hooks';
import {LinePreview} from '../../../LinePreview';

import styles from './TooltipContent.scss';

interface TooltipData {
  name: string;
  point: {
    label: string;
    value: string;
  };
  color: Color;
  lineStyle: LineStyle;
}

export interface TooltipContentProps {
  data: TooltipData[];
  theme?: string;
}

export function TooltipContent({data, theme}: TooltipContentProps) {
  const {tooltip} = useTheme(theme);
  return (
    <div
      className={styles.Container}
      style={{
        background: tooltip.backgroundColor,
        color: tooltip.labelColor,
      }}
    >
      {data.map(({name, point: {label, value}, color, lineStyle}, index) => {
        return (
          <React.Fragment key={`${name}-${index}`}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.Name}>{label}</p>
            <p
              style={{
                color: tooltip.valueColor,
              }}
              className={styles.Value}
            >
              {value}
            </p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
