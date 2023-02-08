import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';
import {useChartContext} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {useCallback} from 'react';

import type {RenderTooltipContentData} from '../../../types';

interface Props {
  data: LineChartDataSeriesWithDefaults[];
  indexForLabels: number;
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}

export function useLineChartTooltipContent({
  data,
  indexForLabels,
  renderTooltipContent,
}: Props) {
  const {theme} = useChartContext();

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

      const key = data[indexForLabels].data[activeIndex]
        ? data[indexForLabels].data[activeIndex].key
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
        title: `${key}`,
        dataSeries: data,
        theme,
      });
    },
    [data, renderTooltipContent, theme, indexForLabels],
  );
}
