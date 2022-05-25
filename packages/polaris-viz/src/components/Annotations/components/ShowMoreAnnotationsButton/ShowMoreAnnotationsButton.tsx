import React, {useContext} from 'react';
import {
  ChartContext,
  estimateStringWidth,
  LINE_HEIGHT,
  useTheme,
} from '@shopify/polaris-viz-core';

import {PILL_HEIGHT, PILL_PADDING, PILL_ROW_GAP} from '../../constants';
import {SingleTextLine} from '../../../Labels';

import styles from './ShowMoreAnnotationsButton.scss';

interface Props {
  label: string;
  onClick: () => void;
  theme: string;
  width: number;
}

export function ShowMoreAnnotationsButton({
  label,
  onClick,
  theme,
  width,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);

  const textWidth = estimateStringWidth(label, characterWidths);

  const radius = PILL_HEIGHT / 2;

  return (
    <g
      className={styles.Button}
      transform={`translate(${0},${PILL_HEIGHT * 2 + PILL_ROW_GAP * 2})`}
      onClick={onClick}
      tabIndex={0}
    >
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={radius}
        y={3}
        x={3}
        opacity={0.5}
      />
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={radius}
        stroke={selectedTheme.chartContainer.backgroundColor}
        strokeWidth={2}
      />
      <SingleTextLine
        color={selectedTheme.annotations.textColor}
        text={label}
        targetWidth={width - PILL_PADDING * 2}
        y={PILL_HEIGHT - LINE_HEIGHT - 1}
        x={width / 2 - textWidth / 2}
      />
    </g>
  );
}
