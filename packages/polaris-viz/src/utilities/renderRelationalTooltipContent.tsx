import type {DataSeries} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {Fragment} from 'react';

import {
  TooltipContentContainer,
  TooltipSeriesName,
  TooltipTitle,
  TooltipRow,
  LinePreview,
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

export function renderRelationalTooltipContent(
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

  function renderSeriesIcon(color, styleOverride): ReactNode {
    if (styleOverride == null) {
      return null;
    }

    return (
      <LinePreview
        color={color}
        lineStyle="solid"
        width={styleOverride?.line?.width ?? 2}
        strokeDasharray={styleOverride?.line?.strokeDasharray}
      />
    );
  }

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
        };
      })
      .filter((series): series is TooltipDataSeries => Boolean(series));

    return (
      <Fragment key={seriesName}>
        {dataSeries.length > 0 && (
          <TooltipSeriesName theme={theme}>{seriesName}</TooltipSeriesName>
        )}
        {dataSeries.map(({name, data, color, groupIndex, styleOverride}) => {
          const item = data[tooltipData.activeIndex];

          return (
            <TooltipRow
              activeIndex={-1}
              color={color}
              index={groupIndex}
              key={`row-${groupIndex}`}
              label={name}
              renderSeriesIcon={() => renderSeriesIcon(color, styleOverride)}
              shape="Line"
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
