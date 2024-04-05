import type {TooltipData, RenderTooltipContentData, Formatters} from '../types';

interface Props {
  data: RenderTooltipContentData;
  formatters: Formatters;
}

export function formatDataForTooltip({data, formatters}: Props): {
  formattedData: TooltipData[];
  title: string | undefined;
} {
  const {keyFormatter, valueFormatter, titleFormatter} = formatters.tooltip;

  const formattedData = data.data.map((data) => {
    const shape = data.shape;
    const noNullData = data.data.filter((data) => {
      return data.value !== null;
    });
    return {
      shape,
      data: noNullData.map((values) => {
        return {
          ...values,
          key: keyFormatter(values.key),
          value: valueFormatter(values.value),
        };
      }),
    };
  });

  return {
    formattedData,
    title: data.title ? titleFormatter(data.title) : undefined,
  };
}
