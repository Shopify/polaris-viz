import type {DataSeries} from '@shopify/polaris-viz-core';
import { Fragment, ReactNode } from 'react';

import {
  TooltipContentContainer,
  TooltipSeriesName,
  TooltipTitle,
  TooltipRow,
} from '../components';
import type {RenderTooltipContentData, TooltipFormatters} from '../types';

interface Group {
  title: string;
  indexes: number[];
}
interface Options {
  title?: string;
  groups?: Group[];
  formatters?: TooltipFormatters;
}

interface TooltipDataSeries extends Required<DataSeries> {
  groupIndex: number;
}

export function renderLinearComparisonTooltip(
  tooltipData: RenderTooltipContentData,
  options: Options = {},
): ReactNode {
  const {
    title,
    groups = [
      {
        title: tooltipData.dataSeries[0].data[tooltipData.activeIndex].key,
        indexes: tooltipData.dataSeries.map((_, index) => index),
      },
    ],
  } = options;

  const {theme} = tooltipData;

  const formatters = {
    keyFormatter: (key) => `${key}`,
    valueFormatter: (value) => `${value}`,
    titleFormatter: (title) => `${title}`,
    ...tooltipData.formatters,
  };

  const content = groups.map(({title: seriesName, indexes}) => {
    const dataSeries = indexes
      .map((groupIndex) => {
        if (tooltipData.data[0].data[groupIndex] == null) {
          return;
        }

        const rawDataSeries = tooltipData.data[0].data[groupIndex];

        return {
          ...tooltipData.dataSeries[groupIndex],
          color: rawDataSeries.color,
          groupIndex,
          isComparison: rawDataSeries.isComparison,
        };
      })
      .filter((series): series is TooltipDataSeries => Boolean(series));

    return (
      <Fragment key={seriesName}>
        <TooltipSeriesName theme={theme}>{seriesName}</TooltipSeriesName>
        {dataSeries.map(({data, color, isComparison, groupIndex}) => {
          const item = data[tooltipData.activeIndex];

          return (
            <TooltipRow
              key={`row-${groupIndex}`}
              activeIndex={-1}
              color={color}
              index={groupIndex}
              isComparison={isComparison}
              label={formatters.keyFormatter(item.key)}
              shape={tooltipData.data[0].shape}
              value={formatters.valueFormatter(item.value ?? 0)}
            />
          );
        })}
      </Fragment>
    );
  });

  return (
    <TooltipContentContainer maxWidth={300} theme={theme}>
      {title != null && (
        <TooltipTitle theme={theme}>
          {formatters.titleFormatter(title)}
        </TooltipTitle>
      )}
      {content}
    </TooltipContentContainer>
  );
}
