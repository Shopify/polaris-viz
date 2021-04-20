import React from 'react';

import {TooltipContent} from '../components/TooltipContent/TooltipContent';
import {LineChartProps} from '../LineChart';

export const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 333, label: '2020-04-01T12:00:00'},
      {rawValue: 897, label: '2020-04-02T12:00:00'},
      {rawValue: 234, label: '2020-04-03T12:00:00'},
      {rawValue: 534, label: '2020-04-04T12:00:00'},
      {rawValue: 132, label: '2020-04-05T12:00:00'},
      {rawValue: 159, label: '2020-04-06T12:00:00'},
      {rawValue: 239, label: '2020-04-07T12:00:00'},
      {rawValue: 908, label: '2020-04-08T12:00:00'},
      {rawValue: 234, label: '2020-04-09T12:00:00'},
      {rawValue: 645, label: '2020-04-10T12:00:00'},
      {rawValue: 543, label: '2020-04-11T12:00:00'},
      {rawValue: 89, label: '2020-04-12T12:00:00'},
      {rawValue: 809, label: '2020-04-13T12:00:00'},
      {rawValue: 129, label: '2020-04-14T12:00:00'},
    ],
    color: 'primary' as 'primary',
    lineStyle: 'solid' as 'solid',
    showArea: true,
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 809, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 997, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
      {rawValue: 623, label: '2020-03-13T12:00:00'},
      {rawValue: 21, label: '2020-03-14T12:00:00'},
    ],
    color: 'pastComparison' as 'pastComparison',
    lineStyle: 'dashed' as 'dashed',
  },
];

export const xAxisLabels = series[0].data.map(({label}) => label);

export function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'numeric',
  });
}

export function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'symbol',
    maximumSignificantDigits: 1,
  }).format(value);
}

export const renderTooltipContent: LineChartProps['renderTooltipContent'] = ({
  data,
}) => {
  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  function formatTooltipLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const formattedData = data.map(
    ({name, point: {label, value}, color, lineStyle}) => ({
      name,
      color,
      lineStyle,
      point: {
        value: formatTooltipValue(value),
        label: formatTooltipLabel(label),
      },
    }),
  );

  return <TooltipContent data={formattedData} />;
};
