import type {Formatters} from 'types';

export function getFormattersWithDefaults(
  formatters?: Partial<Formatters>,
): Required<Formatters> {
  return {
    seriesNameFormatter: (value) => `name: ${value}`,
    xAxisLabelFormatter: (value) => `xAxis: ${value}`,
    yAxisLabelFormatter: (value) => `yAxis: ${value}`,
    ...formatters,
    tooltip: {
      keyFormatter: (key) => `key: ${key}`,
      valueFormatter: (value) => `value: ${value}`,
      titleFormatter: (title) => `title: ${title}`,
      ...formatters?.tooltip,
    },
  };
}
