import {Fragment} from 'react';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

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
  const {keyWidth, valueWidth} = useGetLongestLabelFromData(data);

  const leftWidth = keyWidth * FONT_SIZE_OFFSET;
  const rightWidth = valueWidth * FONT_SIZE_OFFSET;

  return (
    <TooltipContentContainer
      maxWidth={
        PREVIEW_WIDTH + leftWidth + SPACE_BETWEEN_LABEL_AND_VALUE + rightWidth
      }
      theme={theme}
    >
      {({activeColorVisionIndex}) => (
        <Fragment>
          {title != null && <TooltipTitle theme={theme}>{title}</TooltipTitle>}

          {data.map(({data: series, name, shape}, dataIndex) => {
            return (
              <div className={styles.Series} key={dataIndex}>
                {name != null && (
                  <TooltipSeriesName theme={theme}>{name}</TooltipSeriesName>
                )}
                {series.map(
                  (
                    {key, value, color, isComparison, isHidden},
                    seriesIndex,
                  ) => {
                    const indexOffset = data[dataIndex - 1]
                      ? data[dataIndex - 1].data.length
                      : 0;

                    return (
                      <TooltipRow
                        key={`row-${seriesIndex}`}
                        activeIndex={activeColorVisionIndex}
                        color={color}
                        index={seriesIndex + indexOffset}
                        isComparison={isComparison}
                        isHidden={isHidden}
                        label={key}
                        shape={shape}
                        value={value}
                      />
                    );
                  },
                )}
              </div>
            );
          })}
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
