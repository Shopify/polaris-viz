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

export interface Props {
  annotationsCount: number;
  isShowingAllAnnotations: boolean;
  onClick: () => void;
  tabIndex: number;
  theme: string;
  width: number;
  collapseText?: string;
  expandText?: string;
}

export function ShowMoreAnnotationsButton({
  annotationsCount,
  collapseText = 'Collapse annotations',
  expandText = 'Expand annotations',
  isShowingAllAnnotations,
  onClick,
  tabIndex,
  theme,
  width,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);

  const label = isShowingAllAnnotations
    ? collapseText
    : `${expandText} (${annotationsCount})`;
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

      <foreignObject
        height={PILL_HEIGHT}
        width={pillWidth}
        style={{overflow: 'visible'}}
      >
        <button
          className={styles.Button}
          onClick={onClick}
          style={{borderRadius: PILL_HEIGHT / 2}}
          tabIndex={tabIndex}
        >
          {label}
        </button>
      </foreignObject>
    </g>
  );
}
