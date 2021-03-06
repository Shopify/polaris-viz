import React from 'react';

import {DataSeries, Data, NullableData, LineStyle} from '../../types';
import {LinePreview} from '../LinePreview';
import {SquareColorPreview} from '../SquareColorPreview';

import styles from './Legend.scss';

interface LegendData
  extends Omit<Required<DataSeries<Data | NullableData>>, 'data'> {
  lineStyle?: LineStyle;
  data?: (Data | NullableData)[];
}

interface Props {
  series: LegendData[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container} aria-hidden>
      {series.map(({name, color, lineStyle}, index) => {
        return (
          <div className={styles.Series} key={`${name}-${index}`}>
            {lineStyle ? (
              <LinePreview color={color} lineStyle={lineStyle} />
            ) : (
              <SquareColorPreview color={color} />
            )}
            <p className={styles.SeriesName}>{name}</p>
          </div>
        );
      })}
    </div>
  );
}
