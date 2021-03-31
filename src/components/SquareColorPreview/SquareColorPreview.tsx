import React from 'react';
import {Color, GradientColor} from 'types';

import {getColorValue} from '../../utilities';

import styles from './SquareColorPreview.scss';

export function SquareColorPreview({color}: {color: Color | GradientColor}) {
  return (
    <div
      className={styles.ColorPreview}
      style={{background: getColorValue(color)}}
    />
  );
}
