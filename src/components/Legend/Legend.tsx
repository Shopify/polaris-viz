import React from 'react';

import {useThemeSeriesColors} from 'hooks/use-theme-series-colors';
import {useTheme} from 'hooks';
import type {
  DataSeries,
  Data,
  NullableData,
  LineStyle,
  Color,
} from 'types';
import {LinePreview} from 'components/LinePreview';
import {SquareColorPreview} from 'components/SquareColorPreview';

import styles from 'components/Legend/Legend.scss';

type LegendData = DataSeries<Data | NullableData, Color>;

interface LegendSeries extends Omit<LegendData, 'data'> {
  lineStyle?: LineStyle;
  data?: (Data | NullableData)[];
}

export interface Props {
  series: LegendSeries[];
  theme?: string;
}

export function Legend({series, theme}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);
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
