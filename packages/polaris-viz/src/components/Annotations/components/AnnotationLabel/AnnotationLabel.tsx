import React, {Dispatch, SetStateAction} from 'react';
import {LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';
import {SingleTextLine} from '../../../Labels';
import {PILL_HEIGHT, PILL_OPACITY, PILL_PADDING} from '../../constants';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationLabel.scss';

export interface AnnotationLabelProps {
  ariaLabel: string;
  hasContent: boolean;
  index: number;
  isVisible: boolean;
  label: string;
  position: AnnotationPosition;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  tabIndex: number;
  theme: string;
}

const PX_OFFSET = 1;
const CONTENT_LINE_OFFSET = 3;

export function AnnotationLabel({
  ariaLabel,
  hasContent,
  index,
  isVisible,
  label,
  position,
  setActiveIndex,
  tabIndex,
  theme,
}: AnnotationLabelProps) {
  const selectedTheme = useTheme(theme);
  const {isFirefox} = useBrowserCheck();

  const {x, y, width} = position;

  const formattedAriaLabel = `${ariaLabel}: ${label}`;

  return (
    <g
      transform={`translate(${x},${y})`}
      opacity={isVisible ? 1 : 0}
      aria-hidden
    >
      <foreignObject
        height={PILL_HEIGHT}
        width={width}
        style={{overflow: 'visible'}}
      >
        <div className={styles.Blur} style={{borderRadius: PILL_HEIGHT / 2}} />
      </foreignObject>
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={PILL_HEIGHT / 2}
        opacity={isFirefox ? 1 : PILL_OPACITY}
      />
      <SingleTextLine
        ariaHidden
        color={selectedTheme.annotations.textColor}
        text={label}
        targetWidth={width - PILL_PADDING * 2 + PX_OFFSET}
        y={PILL_HEIGHT - LINE_HEIGHT - PX_OFFSET}
        x={PILL_PADDING}
      />
      <React.Fragment>
        {hasContent && (
          <line
            x1={PILL_PADDING}
            x2={width - PILL_PADDING}
            y1={PILL_HEIGHT - CONTENT_LINE_OFFSET}
            y2={PILL_HEIGHT - CONTENT_LINE_OFFSET}
            stroke={selectedTheme.annotations.textColor}
            strokeDasharray="1, 3"
            strokeWidth={1}
          />
        )}
        <foreignObject
          height={PILL_HEIGHT}
          width={width}
          style={{overflow: 'visible'}}
        >
          <button
            aria-describedby={`annotation-content-${index}`}
            aria-label={formattedAriaLabel}
            className={styles.Button}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            tabIndex={tabIndex}
            style={{borderRadius: PILL_HEIGHT / 2}}
          >
            {label}
          </button>
        </foreignObject>
      </React.Fragment>
    </g>
  );
}
