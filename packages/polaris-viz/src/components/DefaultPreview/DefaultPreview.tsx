import type {Color} from '@shopify/polaris-viz-core';

import {getCSSBackgroundFromColor} from '../../utilities/getCSSBackgroundFromColor';

import styles from './DefaultPreview.scss';

const ANGLE = 305;

export interface DefaultPreviewProps {
  color: Color;
}

const ICON_SIZE = 8;

export function DefaultPreview({color}: DefaultPreviewProps) {
  const background = getCSSBackgroundFromColor(color, ANGLE);

  return (
    <span
      className={styles.ColorPreview}
      style={{background, height: ICON_SIZE, width: ICON_SIZE}}
    />
  );
}
