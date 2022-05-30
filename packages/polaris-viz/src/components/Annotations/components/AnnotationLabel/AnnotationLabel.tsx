import React, {Dispatch, SetStateAction} from 'react';
import {LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {SingleTextLine} from '../../../Labels';
import {PILL_HEIGHT, PILL_PADDING} from '../../constants';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationLabel.scss';

interface Props {
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
  hasContent,
  index,
  isVisible,
  label,
  position,
  setActiveIndex,
  tabIndex,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const {x, y, width} = position;

  return (
    <g transform={`translate(${x},${y})`} opacity={isVisible ? 1 : 0}>
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={PILL_HEIGHT / 2}
      />
      <SingleTextLine
        color={selectedTheme.annotations.textColor}
        text={label}
        targetWidth={width - PILL_PADDING * 2 + PX_OFFSET}
        y={PILL_HEIGHT - LINE_HEIGHT - PX_OFFSET}
        x={PILL_PADDING}
      />
      {hasContent && (
        <React.Fragment>
          <line
            x1={PILL_PADDING}
            x2={width - PILL_PADDING}
            y1={PILL_HEIGHT - CONTENT_LINE_OFFSET}
            y2={PILL_HEIGHT - CONTENT_LINE_OFFSET}
            stroke={selectedTheme.annotations.textColor}
            strokeDasharray="1, 3"
            strokeWidth={1}
          />
          <foreignObject
            height={PILL_HEIGHT}
            width={width}
            style={{overflow: 'visible'}}
          >
            <button
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
      )}
    </g>
  );
}
