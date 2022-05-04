import React, {useState} from 'react';
import {
  FONT_SIZE,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  changeColorOpacity,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../hooks';
import type {TooltipAnnotation, TooltipData} from '../../types';

import {useGetLongestLabelFromData} from './hooks/useGetLongestLabelFromData';
import styles from './TooltipContent.scss';
import {SPACE_BETWEEN_LABEL_AND_VALUE} from './constants';
import {TooltipRow, Annotations} from './components/';

export interface TooltipContentProps {
  data: TooltipData[];
  annotations?: TooltipAnnotation[];
  title?: string;
  theme?: string;
}

const FONT_SIZE_OFFSET = 1.061;
const PREVIEW_WIDTH = 14;

export function TooltipContent({
  annotations = [],
  data,
  theme,
  title,
}: TooltipContentProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedTheme = useTheme(theme);
  const {keyWidth, valueWidth} = useGetLongestLabelFromData(data);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveIndex(detail.index),
  });

  const leftWidth = keyWidth * FONT_SIZE_OFFSET;
  const rightWidth = valueWidth * FONT_SIZE_OFFSET;

  return (
    <div
      className={styles.Container}
      style={{
        background: changeColorOpacity(
          selectedTheme.tooltip.backgroundColor,
          0.8,
        ),
        maxWidth:
          PREVIEW_WIDTH +
          leftWidth +
          SPACE_BETWEEN_LABEL_AND_VALUE +
          rightWidth,
      }}
    >
      {title != null && (
        <p
          className={styles.Title}
          style={{color: selectedTheme.tooltip.titleColor}}
        >
          {title}
        </p>
      )}

      <Annotations
        activeIndex={activeIndex}
        annotations={annotations}
        theme={theme}
      />

      {data.map(({data: series, name, shape}, dataIndex) => {
        return (
          <div className={styles.Series} key={dataIndex}>
            {name != null && (
              <p
                className={styles.AxisTitle}
                style={{
                  color: selectedTheme.tooltip.titleColor,
                  fontSize: FONT_SIZE,
                }}
              >
                {name}
              </p>
            )}
            {series.map(({key, value, color, isComparison}, seriesIndex) => {
              return (
                <TooltipRow
                  key={`row-${seriesIndex}`}
                  activeIndex={activeIndex}
                  color={color}
                  index={seriesIndex}
                  isComparison={isComparison}
                  label={key}
                  shape={shape}
                  theme={theme}
                  value={value}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
