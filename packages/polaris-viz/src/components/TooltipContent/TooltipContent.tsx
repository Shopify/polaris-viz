import {Fragment} from 'react';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import type {TooltipData} from '../../types';

import {useGetLongestLabelFromData} from './hooks/useGetLongestLabelFromData';
import {SPACE_BETWEEN_LABEL_AND_VALUE} from './constants';
import {
  TooltipContentContainer,
  TooltipRow,
  TooltipSeries,
  TooltipSeriesName,
  TooltipTitle,
} from './components/';

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

          {data.map(({data: series, name, shape}, dataIndex) => {
            const hasName = name != null;
            const isEmpty = !hasName && series.length === 0;

            return (
              <TooltipSeries isEmpty={isEmpty} key={dataIndex}>
                {hasName && (
                  <TooltipSeriesName theme={theme}>{name}</TooltipSeriesName>
                )}
                {series.map(
                  (
                    {key, value, color, isComparison, isHidden},
                    seriesIndex,
                  ) => {
                    if (
                      // TODO: Check this
                      data[0].data.length > 2 &&
                      isComparison !== true &&
                      activeColorVisionIndex !== -1 &&
                      seriesIndex !== activeColorVisionIndex
                    ) {
                      return null;
                    }

                    return (
                      <TooltipRow
                        key={`row-${seriesIndex}`}
                        color={color}
                        isComparison={isComparison}
                        isHidden={isHidden}
                        label={key}
                        shape={shape}
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
