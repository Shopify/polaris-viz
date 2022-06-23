import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';
import {ReactNode, useCallback} from 'react';

import type {RenderTooltipContentData} from '../../../types';

interface Props {
  data: LineChartDataSeriesWithDefaults[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}

export function useLineChartTooltipContent({
  data,
  renderTooltipContent,
}: Props) {
  return useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const tooltipData: RenderTooltipContentData['data'] = [
        {
          shape: 'Line',
          data: [],
        },
      ];

      const key = data[0].data[activeIndex]
        ? data[0].data[activeIndex].key
        : '';

      data.forEach(({name, data: seriesData, color, isComparison}) => {
        if (!seriesData[activeIndex]) {
          return;
        }
        const {value} = seriesData[activeIndex];

        tooltipData[0].data.push({
          key: `${name}`,
          value,
          color: color!,
          isComparison,
        });
      });

      return renderTooltipContent({
        data: tooltipData,
        activeIndex,
        title: key,
        dataSeries: data,
      });
    },
    [data, renderTooltipContent],
  );
}
