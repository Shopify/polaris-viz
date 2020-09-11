import React from 'react';
import {Color} from 'types';
import {getColorValue} from 'utilities';

import styles from './SquareColorPreview.scss';

export function SquareColorPreview({color}: {color: Color}) {
  return (
    <div
      className={styles.ColorPreview}
      style={{background: getColorValue(color)}}
    />
  );
}
