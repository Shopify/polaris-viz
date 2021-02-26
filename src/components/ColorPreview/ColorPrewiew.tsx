import React from 'react';
import {Color} from 'types';

import {getColorValue} from '../../utilities';

import styles from './ColorPreview.scss';

export enum ColorPreviewType {
  Circle,
  Square,
}
export function ColorPreview({
  color,
  type,
}: {
  color: Color;
  type?: ColorPreviewType;
}) {
  function getColorPreviewClassName(type?: ColorPreviewType) {
    switch (type) {
      case ColorPreviewType.Circle:
        return styles.Circle;
      case ColorPreviewType.Square:
        return styles.Square;
      default:
        return styles.Square;
    }
  }

  return (
    <div
      className={getColorPreviewClassName(type)}
      style={{background: getColorValue(color)}}
    />
  );
}
