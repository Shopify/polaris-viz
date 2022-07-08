import type {DataSeries, LabelFormatter} from 'types';

interface GetAriaLabelOptions {
  xAxisLabelFormatter: LabelFormatter;
  yAxisLabelFormatter?: LabelFormatter;
}

interface Props {
  seriesIndex: number;
  data: DataSeries[];
  key?: string | number;
  options: GetAriaLabelOptions;
}

export function getAriaLabel({seriesIndex, data, key, options}: Props) {
  const {xAxisLabelFormatter, yAxisLabelFormatter} = options;
  const ariaSeries = data
    .map(({name, data}) =>
      data[seriesIndex]
        ? `${name} ${xAxisLabelFormatter(data[seriesIndex].value)}`
        : '',
    )
    .join(', ');

  if (!yAxisLabelFormatter) {
    return key ? `${key}: ${ariaSeries}` : '';
  }

  return key ? `${yAxisLabelFormatter(key)}: ${ariaSeries}` : '';
}
