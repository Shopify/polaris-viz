import {ReactNode, useCallback} from 'react';

import type {RenderTooltipContentData} from '../../../types';
import type {DataWithDefaults} from '../';

interface Props {
  data: DataWithDefaults[];
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

      data.forEach(({name, data: seriesData, color, lineStyle}) => {
        const {value} = seriesData[activeIndex];

        tooltipData[0].data.push({
          key: `${name}`,
          value,
          color: color!,
          isComparison: lineStyle === 'dotted',
        });
      });

      return renderTooltipContent({
        data: tooltipData,
        activeIndex,
        title: `${data[0].data[activeIndex].key}`,
        dataSeries: data,
      });
    },
    [data, renderTooltipContent],
  );
}
