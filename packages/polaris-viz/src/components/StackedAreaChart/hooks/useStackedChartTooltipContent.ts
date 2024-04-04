import type {ReactNode} from 'react';
import {useCallback} from 'react';
import type {
  Color,
  DataSeries,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {useChartContext} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../../../types';

export interface Props {
  data: DataSeries[];
  seriesColors: Color[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  seriesNameFormatter: LabelFormatter;
}

export function useStackedChartTooltipContent({
  data,
  renderTooltipContent,
  seriesColors,
  seriesNameFormatter,
}: Props) {
  const {theme} = useChartContext();

  return useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const tooltipData: RenderTooltipContentData['data'] = [
        {
          shape: 'Bar',
          data: [],
        },
      ];

      data.forEach(({name, data: seriesData, color}, index) => {
        const {value} = seriesData[activeIndex];

        tooltipData[0].data.push({
          key: `${seriesNameFormatter(name ?? '')}`,
          value,
          color: color ?? seriesColors[index],
        });
      });

      return renderTooltipContent({
        data: tooltipData,
        activeIndex,
        title: `${data[0].data[activeIndex].key}`,
        dataSeries: data,
        theme,
      });
    },
    [data, seriesColors, renderTooltipContent, theme, seriesNameFormatter],
  );
}
