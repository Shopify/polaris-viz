import type {XAxisOptions, YAxisOptions} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData, TooltipData} from '../types';

export interface Props {
  data: RenderTooltipContentData;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
}

export function formatTooltipDataForLinearCharts({
  data: tooltipData,
  xAxisOptions,
  yAxisOptions,
}: Props): {
  formattedData: TooltipData[];
  title: string | undefined;
} {
  const formattedData = tooltipData.data.map((data) => {
    return {
      ...data,
      data: data.data.map((values) => {
        return {
          ...values,
          key: `${values.key}`,
          value: yAxisOptions.labelFormatter(values.value),
        };
      }),
    };
  });

  return {
    formattedData,
    title: tooltipData.title
      ? xAxisOptions.labelFormatter(tooltipData.title)
      : undefined,
  };
}
