import {ReactNode, useCallback} from 'react';
import {Color, DataSeries, useChartContext} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../types';

export interface Props {
  data: DataSeries[];
  seriesColors: Color[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}

export function useBarChartTooltipContent({
  data,
  renderTooltipContent,
  seriesColors,
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
          key: `${name}`,
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
    [data, seriesColors, theme, renderTooltipContent],
  );
}
