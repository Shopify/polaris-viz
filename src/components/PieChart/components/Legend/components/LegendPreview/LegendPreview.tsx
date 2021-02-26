import React from 'react';

import {Series} from '../../../../types';
import {ColorPreview, ColorPreviewType} from '../../../../../ColorPreview';

import styles from './LegendPreview.scss';

interface Props {
  series: Series;
}

export function LegendPreview({series: {color, name, value}}: Props) {
  return (
    <div className={styles.Series}>
      <ColorPreview color={color} type={ColorPreviewType.Circle} />
      <p
        className={styles.SeriesName}
        aria-label={name}
        aria-describedby="name"
      >
        {name}
      </p>
      <p
        className={styles.SeriesValue}
        aria-label={value.toString()}
        aria-describedby="value"
      >
        {value}
      </p>
    </div>
  );
}
