import {Fragment} from 'react';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import type {TooltipData} from '../../types';

import {useGetLongestLabelFromData} from './hooks/useGetLongestLabelFromData';
import {SPACE_BETWEEN_LABEL_AND_VALUE} from './constants';
import {
  TooltipContentContainer,
  TooltipRow,
  TooltipSeries,
  TooltipTitle,
  getColumnCount,
} from './components';

export interface TooltipContentProps {
  data: TooltipData[];
  title?: string;
  theme?: string;
  ignoreColorVisionEvents?: boolean;
}

const FONT_SIZE_OFFSET = 1.061;
const PREVIEW_WIDTH = 14;

export function TooltipContent({
  data,
  theme = DEFAULT_THEME_NAME,
  title,
  ignoreColorVisionEvents = false,
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
      ignoreColorVisionEvents={ignoreColorVisionEvents}
    >
      {({activeColorVisionIndex}) => (
        <Fragment>
          {title != null && <TooltipTitle theme={theme}>{title}</TooltipTitle>}

          {data.map((tooltipData, dataIndex) => {
            const {data: series, name, shape} = tooltipData;

            const hasName = name != null;
            const isEmpty = !hasName && series.length === 0;

            if (isEmpty) {
              return null;
            }

            return (
              <TooltipSeries
                key={dataIndex}
                columnCount={getColumnCount(tooltipData)}
                name={name}
              >
                {series.map(
                  (
                    {key, value, color, isComparison, isHidden, trend},
                    seriesIndex,
                  ) => {
                    if (
                      data[0].data.length > 2 &&
                      activeColorVisionIndex !== -1 &&
                      seriesIndex !== activeColorVisionIndex &&
                      !isHidden
                    ) {
                      return null;
                    }

                    return (
                      <TooltipRow
                        color={color}
                        isComparison={isComparison}
                        key={`row-${seriesIndex}`}
                        label={key}
                        shape={shape}
                        trend={trend}
                        value={value}
                      />
                    );
                  },
                )}
              </TooltipSeries>
            );
          })}
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
