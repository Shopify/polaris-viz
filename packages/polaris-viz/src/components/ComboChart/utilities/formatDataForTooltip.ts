import type {XAxisOptions} from '@shopify/polaris-viz-core';

import type {TooltipData, RenderTooltipContentData} from '../../../types';

interface Props {
  data: RenderTooltipContentData;
  xAxisOptions: Required<XAxisOptions>;
}

export function formatDataForTooltip({data, xAxisOptions}: Props): {
  formattedData: TooltipData[];
  title: string | undefined;
} {
  const formattedData = data.data.map((data) => {
    return {
      ...data,
      data: data.data.map((values) => {
        return {
          ...values,
          key: `${values.key}`,
          value: `${values.value}`,
        };
      }),
    };
  });

  return {
    formattedData,
    title: data.title ? xAxisOptions.labelFormatter(data.title) : undefined,
  };
}
