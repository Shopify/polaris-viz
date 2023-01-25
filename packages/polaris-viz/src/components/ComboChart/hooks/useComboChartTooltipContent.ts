import {ReactNode, useCallback} from 'react';
import {
  Color,
  DataGroup,
  Shape,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {flattenDataGroupToDataSeries} from '../../../utilities/flattenDataGroupToDataSeries';
import {getYAxisOptionsWithDefaults} from '../../../utilities';
import type {
  RenderTooltipContentData,
  RenderTooltipDataPoint,
} from '../../../types';

export interface Props {
  data: DataGroup[];
  seriesColors: Color[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}

export function useComboChartTooltipContent({
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

      const tooltipData: RenderTooltipContentData['data'] = [];

      let index = 0;

      data.forEach(({shape, name, series, yAxisOptions}) => {
        const yAxisOptionsWithDefaults =
          getYAxisOptionsWithDefaults(yAxisOptions);

        const data: {
          shape: Shape;
          data: RenderTooltipDataPoint[];
          name?: string;
        } = {
          shape,
          name,
          data: [],
        };

        series.forEach(({name, data: seriesData, color, isComparison}) => {
          const {value} = seriesData[activeIndex];

          data.data.push({
            key: `${name}`,
            value: yAxisOptionsWithDefaults.labelFormatter(value),
            color: color ?? seriesColors[index],
            isComparison,
          });

          index++;
        });

        tooltipData.push(data);
      });

      return renderTooltipContent({
        data: tooltipData,
        activeIndex,
        title: `${data[0].series[0].data[activeIndex].key}`,
        dataSeries: flattenDataGroupToDataSeries(data),
        theme,
      });
    },
    [data, seriesColors, renderTooltipContent, theme],
  );
}
