import React, {useState} from 'react';
import type {Color} from '@shopify/polaris-viz-core';
import type {LineStyle} from 'types';

import {COLOR_VISION_SINGLE_ITEM} from '../../../../constants';
import {getSeriesColors} from '../../../../hooks/use-theme-series-colors';
import {
  getOpacityStylesForActive,
  useTheme,
  useWatchColorVisionEvents,
} from '../../../../hooks';
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
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const selectedTheme = useTheme(theme);
  const seriesColor = getSeriesColors(data.length, selectedTheme);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

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
          <div
            className={styles.Row}
            key={`${name}-${index}`}
            style={getOpacityStylesForActive({
              activeIndex: activeLineIndex,
              index,
            })}
          >
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
          </div>
        );
      })}
    </div>
  );
}
