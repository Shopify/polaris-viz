import {useState} from 'react';
import {
  COLOR_VISION_SINGLE_ITEM,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../hooks';
import type {TooltipData} from '../../types';

import {useGetLongestLabelFromData} from './hooks/useGetLongestLabelFromData';
import styles from './TooltipContent.scss';
import {SPACE_BETWEEN_LABEL_AND_VALUE} from './constants';
import {
  TooltipContentContainer,
  TooltipRow,
  TooltipSeriesName,
  TooltipTitle,
} from './components/';

export interface TooltipContentProps {
  data: TooltipData[];
  title?: string;
  theme?: string;
}

const FONT_SIZE_OFFSET = 1.061;
const PREVIEW_WIDTH = 14;

export function TooltipContent({
  data,
  theme = DEFAULT_THEME_NAME,
  title,
}: TooltipContentProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const {keyWidth, valueWidth} = useGetLongestLabelFromData(data);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveIndex(detail.index),
  });

  const leftWidth = keyWidth * FONT_SIZE_OFFSET;
  const rightWidth = valueWidth * FONT_SIZE_OFFSET;

  return (
    <TooltipContentContainer
      maxWidth={
        PREVIEW_WIDTH + leftWidth + SPACE_BETWEEN_LABEL_AND_VALUE + rightWidth
      }
      theme={theme}
    >
      {title != null && <TooltipTitle theme={theme}>{title}</TooltipTitle>}

      {data.map(({data: series, name, shape}, dataIndex) => {
        return (
          <div className={styles.Series} key={dataIndex}>
            {name != null && (
              <TooltipSeriesName theme={theme}>{name}</TooltipSeriesName>
            )}
            {series.map(({key, value, color, isComparison}, seriesIndex) => {
              const indexOffset = data[dataIndex - 1]
                ? data[dataIndex - 1].data.length
                : 0;

              return (
                <TooltipRow
                  key={`row-${seriesIndex}`}
                  activeIndex={activeIndex}
                  color={color}
                  index={seriesIndex + indexOffset}
                  isComparison={isComparison}
                  label={key}
                  shape={shape}
                  value={value}
                />
              );
            })}
          </div>
        );
      })}
    </TooltipContentContainer>
  );
}
