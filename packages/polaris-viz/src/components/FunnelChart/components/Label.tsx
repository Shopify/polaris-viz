import React from 'react';
import {animated} from '@react-spring/web';
import type {SpringValue} from '@react-spring/web';

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
  label: string;
  labelWidth: number;
  size: Size;
  color?: string;
  backgroundColor?: string;
  transform: SpringValue;
}

export function Label({
  label,
  labelWidth,
  size,
  color,
  backgroundColor,
  transform,
}: LabelProps) {
  const fontSize = FONT_SIZES[size];

  return (
    /* To display labels correctly in Safari, we need to wrap foreignObject in group element
    and apply the transform property on the group element. */
    <animated.g
      aria-hidden
      style={{
        transform,
      }}
    >
      <foreignObject
        height={LABEL_HEIGHT}
        width={labelWidth}
        aria-hidden="true"
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
    </animated.g>
  );
}
