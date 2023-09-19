import type {ReactNode} from 'react';
import {useCallback} from 'react';
import type {Color, DataSeries} from '@shopify/polaris-viz-core';
import {useChartContext} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../types';

export interface Props {
  data: DataSeries[];
  seriesColors: Color[];
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
}

export function useDonutChartTooltipContents({
  data,
  renderTooltipContent,
  seriesColors,
}: Props) {
  const {theme} = useChartContext();

  return useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1 || !renderTooltipContent) {
        return null;
      }

      const tooltipData: RenderTooltipContentData['data'] = [
        {
          shape: 'Donut',
          data: [],
        },
      ];

      tooltipData[0].data.push({
        key: `${data[activeIndex].name}`,
        value: data[activeIndex].data[0].value,
        color: data[activeIndex].color ?? seriesColors[activeIndex],
      });

      return renderTooltipContent({
        data: tooltipData,
        activeIndex,
        dataSeries: data,
        theme,
      });
    },
    [data, seriesColors, theme, renderTooltipContent],
  );
}
