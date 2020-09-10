import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import styles from './SquareColorPreview.scss';

export function SquareColorPreview({color}: {color: Color}) {
  return (
    <div className={styles.ColorPreview} style={{background: tokens[color]}} />
  );
}
