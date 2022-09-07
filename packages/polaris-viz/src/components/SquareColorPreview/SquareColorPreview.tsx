import React from 'react';
import type {Color} from '@shopify/polaris-viz-core';

import {getCSSBackgroundFromColor} from '../../utilities/getCSSBackgroundFromColor';
import {PREVIEW_ICON_SIZE} from '../../constants';

import styles from './SquareColorPreview.scss';

const ANGLE = 305;

export interface SquareColorPreviewProps {
  color: Color;
}

export function SquareColorPreview({color}: SquareColorPreviewProps) {
  const background = getCSSBackgroundFromColor(color, ANGLE);

  return (
    <span
      className={styles.ColorPreview}
      style={{background, height: PREVIEW_ICON_SIZE, width: PREVIEW_ICON_SIZE}}
    />
  );
}
