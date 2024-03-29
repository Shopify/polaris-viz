import type {ReactNode} from 'react';
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
  labelHelper?: ReactNode;
  size: Size;
  color?: string;
  backgroundColor?: string;
  transform: SpringValue;
}

export function Label({
  label,
  labelWidth,
  labelHelper,
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
        className={styles.YAxis}
      >
        <div
          className={styles.Label}
          style={{
            fontSize: `${fontSize}px`,
            color,
            lineHeight: `${HORIZONTAL_BAR_LABEL_HEIGHT}px`,
          }}
        >
          <span
            style={{
              backgroundColor,
              height: HORIZONTAL_BAR_LABEL_HEIGHT,
              userSelect: 'none',
            }}
          >
            {label}
          </span>
          {labelHelper}
        </div>
      </foreignObject>
    </animated.g>
  );
}
