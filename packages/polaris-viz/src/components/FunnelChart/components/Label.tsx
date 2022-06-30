import React from 'react';

import {HORIZONTAL_BAR_LABEL_HEIGHT} from '../../../constants';

import styles from './Label.scss';

type Size = 'small' | 'large';

const LABEL_HEIGHT = 20;

const LARGE_FONT = 20;

const SMALL_FONT = 14;

const FONT_SIZES = {
  small: SMALL_FONT,
  large: LARGE_FONT,
};

export interface LabelProps {
  barHeight: number;
  label: string;
  labelWidth: number;
  x: number;
  y: number;
  size: Size;
  color?: string;
  backgroundColor?: string;
}

export function Label({
  barHeight,
  label,
  labelWidth,
  x,
  y,
  size,
  color,
  backgroundColor,
}: LabelProps) {
  const labelYOffset = (barHeight - HORIZONTAL_BAR_LABEL_HEIGHT) / 2;

  const fontSize = FONT_SIZES[size];

  return (
    /* To display labels correctly in Safari, we need to wrap foreignObject in group element
    and apply the transform property on the group element. */
    <g
      style={{
        transform: `translateX(${x}px)`,
      }}
    >
      <foreignObject
        height={LABEL_HEIGHT}
        width={labelWidth}
        aria-hidden="true"
        y={y + labelYOffset}
      >
        <div
          className={styles.Label}
          style={{
            fontSize: `${fontSize}px`,
            color,
            lineHeight: `${HORIZONTAL_BAR_LABEL_HEIGHT}px`,
            height: HORIZONTAL_BAR_LABEL_HEIGHT,
          }}
        >
          <span
            style={{
              backgroundColor,
            }}
          >
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}
