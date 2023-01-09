import React, {ReactNode} from 'react';

import {
  TooltipContentContainer,
  TooltipSeriesName,
  TooltipTitle,
  TooltipRow,
  LinePreview,
} from '../../';
import type {RenderTooltipContentData} from '../../../types';
import type {LineChartRelationalDataSeries} from '../types';

export function renderTooltipContent(
  tooltipData: RenderTooltipContentData,
  theme: string,
): ReactNode {
  const formatters = {
    keyFormatter: (key) => `${key}`,
    valueFormatter: (value) => `${value}`,
    titleFormatter: (title) => `${title}`,
    ...tooltipData.formatters,
  };

  function renderSeriesIcon(
    dataSeries: LineChartRelationalDataSeries,
    item,
  ): ReactNode {
    if (dataSeries.metadata?.shape === 'Bar') {
      return undefined;
    }

    return (
      <LinePreview
        color={item.color}
        lineStyle="solid"
        width={dataSeries.styleOverride?.line?.width ?? 2}
        strokeDasharray={dataSeries.styleOverride?.line?.strokeDasharray}
      />
    );
  }

  const content = tooltipData.data.map((series, groupIndex) => {
    return (
      <React.Fragment key={`group-${groupIndex}`}>
        <TooltipSeriesName theme={theme}>{series.name}</TooltipSeriesName>
        {series.data.map((item, index) => {
          const dataSeries = tooltipData.dataSeries[
            index
          ] as LineChartRelationalDataSeries;

          return (
            <TooltipRow
              key={`row-${index}`}
              activeIndex={-1}
              color={item.color}
              index={index}
              isComparison={item.isComparison}
              label={formatters.keyFormatter(item.key)}
              shape={dataSeries.metadata?.shape ?? series.shape}
              renderSeriesIcon={() => renderSeriesIcon(dataSeries, item)}
              value={formatters.valueFormatter(item.value ?? 0)}
            />
          );
        })}
      </React.Fragment>
    );
  });

  return (
    <TooltipContentContainer maxWidth={300} theme={theme}>
      {tooltipData.title != null && (
        <TooltipTitle theme={theme}>
          {formatters.titleFormatter(tooltipData.title)}
        </TooltipTitle>
      )}
      {content}
    </TooltipContentContainer>
  );
}
