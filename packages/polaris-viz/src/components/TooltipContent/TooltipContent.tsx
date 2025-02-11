import {Fragment} from 'react';
import {DEFAULT_THEME_NAME, useChartContext} from '@shopify/polaris-viz-core';

import {hasHiddenComparisonSeries} from '../../utilities/hasHiddenComparisonSeries';
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
  const {comparisonSeriesIndexes} = useChartContext();

  const leftWidth = keyWidth * FONT_SIZE_OFFSET;
  const rightWidth = valueWidth * FONT_SIZE_OFFSET;

  const isMultiSeries = data[0]?.data.length > 2;

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
                    // This check is for when we are rendering multiple series lines
                    // and we have an active index.
                    // We only want to render the active series line and it's
                    // matching comparison series line.
                    if (
                      // If we more than 2 series lines...
                      isMultiSeries &&
                      // and the series is not a comparison series...
                      isComparison !== true &&
                      // and we have an active index...
                      activeColorVisionIndex !== -1 &&
                      // and the series index is not the active index, hide it.
                      seriesIndex !== activeColorVisionIndex
                    ) {
                      return null;
                    }

                    if (
                      hasHiddenComparisonSeries({
                        index: seriesIndex,
                        activeColorVisionIndex,
                        comparisonSeriesIndexes,
                      })
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
