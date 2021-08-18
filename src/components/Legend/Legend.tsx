import React from 'react';

import {useTheme} from '../../hooks';
import type {
  DataSeries,
  Data,
  NullableData,
  LineStyle,
  SeriesColor,
} from '../../types';
import {LinePreview} from '../LinePreview';
import {SquareColorPreview} from '../SquareColorPreview';

import styles from './Legend.scss';

type LegendData = Required<DataSeries<Data | NullableData, SeriesColor>>;

interface LegendProps extends Omit<LegendData, 'data'> {
  lineStyle?: LineStyle;
  data?: (Data | NullableData)[];
}

interface Props {
  series: LegendProps[];
  theme?: string;
}

export function Legend({series, theme}: Props) {
  const selectedTheme = useTheme(theme);
  const {labelColor} = selectedTheme.legend;
  return (
    <div className={styles.Container} aria-hidden>
      {series.map(({name, color, lineStyle}, index) => {
        return (
          <div className={styles.Series} key={`${name}-${index}`}>
            {lineStyle ? (
              <LinePreview color={color} lineStyle={lineStyle} />
            ) : null}

            {lineStyle == null ? <SquareColorPreview color={color} /> : null}

            <p style={{color: labelColor}} className={styles.SeriesName}>
              {name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
