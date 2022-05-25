import React, {Dispatch, SetStateAction} from 'react';
import {LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {SingleTextLine} from '../../../Labels';
import {PILL_HEIGHT, PILL_PADDING} from '../../constants';
import type {AnnotationPosition} from '../../types';

interface Props {
  index: number;
  label: string;
  position: AnnotationPosition;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  theme: string;
}

export function AnnotationLabel({
  index,
  label,
  position,
  setActiveIndex,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const {x, y, width} = position;

  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseEnter={() => setActiveIndex(index)}
    >
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={PILL_HEIGHT / 2}
      />
      <SingleTextLine
        color={selectedTheme.annotations.textColor}
        text={label}
        targetWidth={width - PILL_PADDING * 2 + 1}
        y={PILL_HEIGHT - LINE_HEIGHT - 1}
        x={PILL_PADDING}
      />
    </g>
  );
}
