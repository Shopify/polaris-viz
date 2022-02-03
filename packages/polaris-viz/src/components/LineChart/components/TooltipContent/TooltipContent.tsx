import React from 'react';
import type {LineStyle, Color} from 'types';
import {getSeriesColorsFromCount, useTheme} from '@shopify/polaris-viz-core';

import {LinePreview} from '../../../LinePreview';

import styles from './TooltipContent.scss';

export interface TooltipData {
  name: string;
  point: {
    label: string;
    value: string | number;
  };
  color?: Color;
  lineStyle: LineStyle;
}

export interface TooltipContentProps {
  data: TooltipData[];
  theme?: string;
}

export function TooltipContent({data, theme}: TooltipContentProps) {
  const selectedTheme = useTheme(theme);
  const seriesColor = getSeriesColorsFromCount(data.length, selectedTheme);

  const {tooltip} = selectedTheme;
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
            <LinePreview
              color={color ?? seriesColor[index]}
              lineStyle={lineStyle}
            />
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
