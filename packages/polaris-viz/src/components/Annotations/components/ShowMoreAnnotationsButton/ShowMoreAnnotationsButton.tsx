import React, {useContext} from 'react';
import {
  ChartContext,
  estimateStringWidth,
  LINE_HEIGHT,
  useTheme,
} from '@shopify/polaris-viz-core';

import {PILL_HEIGHT, PILL_PADDING, PILL_X_MIN} from '../../constants';
import {SingleTextLine} from '../../../Labels';

import styles from './ShowMoreAnnotationsButton.scss';
import {Icon, Shadow} from './components';

const STROKE = 2;

interface Props {
  annotationsCount: number;
  isShowingAllAnnotations: boolean;
  onClick: () => void;
  theme: string;
  width: number;
}

export function ShowMoreAnnotationsButton({
  annotationsCount,
  isShowingAllAnnotations,
  onClick,
  theme,
  width,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);

  const label = isShowingAllAnnotations
    ? 'Collapse annotations'
    : `Expand annotations (${annotationsCount})`;
  const textWidth = estimateStringWidth(label, characterWidths);

  const radius = PILL_HEIGHT / 2;
  const pillWidth = width + Math.abs(PILL_X_MIN);
  const pillHeight = PILL_HEIGHT + STROKE;

  return (
    <g
      className={styles.Button}
      transform={`translate(${PILL_X_MIN},-1)`}
      onClick={onClick}
      tabIndex={0}
    >
      {!isShowingAllAnnotations && (
        <Shadow
          height={pillHeight}
          width={pillWidth}
          fill={selectedTheme.annotations.backgroundColor}
          radius={radius}
        />
      )}

      <rect
        height={pillHeight}
        width={pillWidth}
        fill={
          isShowingAllAnnotations
            ? 'transparent'
            : selectedTheme.annotations.backgroundColor
        }
        ry={radius}
        stroke={
          isShowingAllAnnotations
            ? selectedTheme.annotations.backgroundColor
            : selectedTheme.chartContainer.backgroundColor
        }
        strokeWidth={STROKE}
      />

      <Icon
        fill={selectedTheme.annotations.textColor}
        isShowingAllAnnotations={isShowingAllAnnotations}
      />

      <SingleTextLine
        color={selectedTheme.annotations.textColor}
        text={label}
        targetWidth={pillWidth - PILL_PADDING * 2}
        y={PILL_HEIGHT - LINE_HEIGHT}
        x={pillWidth / 2 - textWidth / 2}
      />
    </g>
  );
}
