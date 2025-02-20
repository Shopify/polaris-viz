import type {DataSeries} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {Fragment} from 'react';

import {
  TooltipSeries,
  TooltipContentContainer,
  TooltipTitle,
  TooltipRow,
  LinePreview,
  getTooltipContentTemplateColumnCount,
} from '../components';
import type {
  RenderTooltipContentData,
  TooltipData,
  TooltipFormatters,
} from '../types';

interface Group {
  title: string;
  indexes: number[];
}
export interface Options {
  title?: string;
  groups?: Group[];
  formatters?: TooltipFormatters;
}

interface TooltipDataSeries extends Required<DataSeries> {
  groupIndex: number;
  isHidden: boolean;
}

export function renderLinearTooltipContent(
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
    if (styleOverride?.line == null) {
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

  function renderContent({
    activeColorVisionIndex,
  }: {
    activeColorVisionIndex: number;
  }) {
    return groups.map(({title: seriesName, indexes}) => {
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
            isHidden: rawDataSeries.value == null || rawDataSeries.isHidden,
          };
        })
        .filter((series): series is TooltipDataSeries => Boolean(series));

      const hasTitle = dataSeries.some(({isHidden}) => isHidden !== true);

      const content = dataSeries
        .map(
          ({
            name,
            data,
            color,
            isComparison,
            groupIndex,
            styleOverride,
            isHidden,
            metadata,
          }) => {
            const item = data[tooltipData.activeIndex];

            if (
              metadata?.relatedIndex !== activeColorVisionIndex &&
              activeColorVisionIndex !== -1 &&
              groupIndex !== activeColorVisionIndex &&
              !isHidden
            ) {
              return null;
            }

            return (
              <TooltipRow
                color={color}
                isComparison={isComparison}
                key={`row-${groupIndex}`}
                label={name}
                renderSeriesIcon={() => renderSeriesIcon(color, styleOverride)}
                shape={styleOverride?.tooltip?.shape ?? 'Line'}
                value={formatters.valueFormatter(item.value ?? 0)}
              />
            );
          },
        )
        .filter(Boolean);

      if (content.length === 0 || !hasTitle) {
        return null;
      }

      return (
        <TooltipSeries
          key={seriesName}
          name={seriesName.toString()}
          templateColumnCount={getTooltipContentTemplateColumnCount(
            tooltipData.data[0] as TooltipData,
          )}
        >
          {content}
        </TooltipSeries>
      );
    });
  }

  return (
    <TooltipContentContainer maxWidth={300} theme={theme}>
      {({activeColorVisionIndex}) => (
        <Fragment>
          {title != null && (
            <TooltipTitle theme={theme}>
              {formatters.titleFormatter(title)}
            </TooltipTitle>
          )}
          {renderContent({activeColorVisionIndex})}
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
