import React, {useRef} from 'react';
import type {Color, LineStyle} from '@shopify/polaris-viz-core';
import {
  LinearGradientWithStops,
  isGradientType,
  uniqueId,
} from '@shopify/polaris-viz-core';

import {PREVIEW_ICON_SIZE, XMLNS} from '../../constants';

import {
  DOTTED_LINE_PREVIEW_CY,
  DOTTED_LINE_PREVIEW_RADIUS,
  DOT_SPACING,
} from './constants';
import styles from './LinePreview.scss';

export interface LinePreviewProps {
  color: Color;
  lineStyle: LineStyle;
  width?: number;
  strokeDasharray?: string;
}

const HEIGHT = 2;
const WIDTH = 2;

export function LinePreview({
  color,
  lineStyle,
  width = WIDTH,
  strokeDasharray = 'none',
}: LinePreviewProps) {
  const gradientId = useRef(uniqueId('linePreviewGradient'));

  const linePreviewColor = isGradientType(color)
    ? `url(#${gradientId.current})`
    : color;

  return (
    <span
      className={styles.Container}
      style={{height: HEIGHT, width: PREVIEW_ICON_SIZE}}
    >
      <svg
        className={styles.SVG}
        height={`${HEIGHT}px`}
        viewBox={`0 0 ${PREVIEW_ICON_SIZE} ${HEIGHT}`}
        width={`${PREVIEW_ICON_SIZE}px`}
        xmlns={XMLNS}
      >
        {isGradientType(color) ? (
          <defs>
            <LinearGradientWithStops
              id={gradientId.current}
              gradient={color}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            />
          </defs>
        ) : null}
        {getLinePreview({
          color: linePreviewColor,
          lineStyle,
          width,
          strokeDasharray,
        })}
      </svg>
    </span>
  );
}

interface GetLinePreview {
  color: string;
  lineStyle: LineStyle;
  width: number;
  strokeDasharray: string;
}

function getLinePreview({
  color,
  lineStyle,
  width,
  strokeDasharray,
}: GetLinePreview) {
  switch (lineStyle) {
    case 'dotted':
      return (
        <g fill={color}>
          {[...Array(3)].map((_, index) => {
            return (
              <circle
                key={index}
                cx={DOTTED_LINE_PREVIEW_CY + index * DOT_SPACING}
                cy={DOTTED_LINE_PREVIEW_CY}
                r={DOTTED_LINE_PREVIEW_RADIUS}
              />
            );
          })}
        </g>
      );
    default:
      return (
        <path
          d={`M1 1 H${PREVIEW_ICON_SIZE}`}
          stroke={color}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={width}
          strokeDasharray={strokeDasharray}
        />
      );
  }
}
