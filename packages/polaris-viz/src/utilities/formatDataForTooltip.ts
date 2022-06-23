import type {
  TooltipData,
  RenderTooltipContentData,
  TooltipOptions,
} from '../types';

interface Props {
  data: RenderTooltipContentData;
  tooltipOptions: TooltipOptions;
}

export function formatDataForTooltip({data, tooltipOptions}: Props): {
  formattedData: TooltipData[];
  title: string | undefined;
} {
  const {keyFormatter, valueFormatter, titleFormatter} = {
    keyFormatter: (key) => `${key}`,
    valueFormatter: (value) => `${value}`,
    titleFormatter: (title) => `${title}`,
    ...tooltipOptions,
  };

  const formattedData = data.data.map((data) => {
    return {
      ...data,
      data: data.data.map((values) => {
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
