import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
} from 'components/BarChart';
import {ReactNode, useCallback} from 'react';
import type {Color, DataSeries} from 'types';

import type {TooltipData} from '../components';
import {TooltipRowType} from '../components';

interface Props {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataSeries[];
  seriesColors: Color[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}

export function useBarChartTooltipContent({
  annotationsLookupTable,
  data,
  seriesColors,
  renderTooltipContent,
}: Props) {
  return useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const tooltipData: TooltipData[] = [];
      const annotation = annotationsLookupTable[activeIndex];

      data.forEach(({name, data, color}, index) => {
        const {value} = data[activeIndex];

        tooltipData.push({
          label: `${name}`,
          value: `${value}`,
          color: color ?? seriesColors[index],
        });

        if (
          annotation &&
          annotation.dataPointIndex === index &&
          annotation.tooltipData !== null
        ) {
          tooltipData.push({
            label: annotation.tooltipData?.label ?? '',
            color: color ?? seriesColors[index],
            value: annotation.tooltipData?.value ?? '',
            type: TooltipRowType.Annotation,
          });
        }
      });

      return renderTooltipContent({data: tooltipData});
    },
    [annotationsLookupTable, data, seriesColors, renderTooltipContent],
  );
}
