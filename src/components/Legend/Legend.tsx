import React from 'react';

import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import {useTheme} from '../../hooks';
import type {LineStyle, Color} from '../../types';
import {LinePreview} from '../LinePreview';
import {SquareColorPreview} from '../SquareColorPreview';

import styles from './Legend.scss';

interface LegendSeries {
  lineStyle?: LineStyle;
  name?: string;
  color?: Color;
}

export interface Props {
  series: LegendSeries[];
  theme?: string;
}

export function Legend({series, theme}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series as any, selectedTheme);
  const {labelColor} = selectedTheme.legend;
  return (
    <div className={styles.Container} aria-hidden>
      {series.map(({name, color, lineStyle}, index) => {
        const isComparisonPeriod = lineStyle && lineStyle !== 'solid';
        const itemColor =
          color == null || isComparisonPeriod ? seriesColors[index] : color;

        return (
          <div className={styles.Series} key={`${name}-${index}`}>
            {lineStyle ? (
              <LinePreview color={itemColor} lineStyle={lineStyle} />
            ) : null}

            {lineStyle == null ? (
              <SquareColorPreview color={itemColor} />
            ) : null}

            <p style={{color: labelColor}} className={styles.SeriesName}>
              {name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
