import React from 'react';

import {TooltipContent} from '../components/TooltipContent/TooltipContent';
import {LineChartProps} from '../LineChart';

export const gradient = [
  {
    offset: 0,
    color: '#08CA9B',
  },
  {
    offset: 85,
    color: 'rgba(92,105,208,0.8)',
  },
  {
    offset: 100,
    color: 'rgba(92,105,208,0.8)',
  },
];

export const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 333, label: '2020-04-01T12:00:00'},
      {rawValue: 797, label: '2020-04-02T12:00:00'},
      {rawValue: 234, label: '2020-04-03T12:00:00'},
      {rawValue: 534, label: '2020-04-04T12:00:00'},
      {rawValue: -132, label: '2020-04-05T12:00:00'},
      {rawValue: 159, label: '2020-04-06T12:00:00'},
      {rawValue: 239, label: '2020-04-07T12:00:00'},
      {rawValue: 708, label: '2020-04-08T12:00:00'},
      {rawValue: 234, label: '2020-04-09T12:00:00'},
      {rawValue: 645, label: '2020-04-10T12:00:00'},
      {rawValue: 543, label: '2020-04-11T12:00:00'},
      {rawValue: 89, label: '2020-04-12T12:00:00'},
      {rawValue: 849, label: '2020-04-13T12:00:00'},
      {rawValue: 129, label: '2020-04-14T12:00:00'},
    ],
    color: gradient,
    areaColor: 'rgba(92,105,208,0.5)',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 709, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 710, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
      {rawValue: 623, label: '2020-03-13T12:00:00'},
      {rawValue: 21, label: '2020-03-14T12:00:00'},
    ],
    color: 'red',
    lineStyle: 'dotted' as 'dotted',
  },
];

export const seriesUsingSeriesColors = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 333, label: '2020-04-01T12:00:00'},
      {rawValue: 797, label: '2020-04-02T12:00:00'},
      {rawValue: 234, label: '2020-04-03T12:00:00'},
      {rawValue: 534, label: '2020-04-04T12:00:00'},
      {rawValue: -132, label: '2020-04-05T12:00:00'},
      {rawValue: 159, label: '2020-04-06T12:00:00'},
      {rawValue: 239, label: '2020-04-07T12:00:00'},
      {rawValue: 708, label: '2020-04-08T12:00:00'},
      {rawValue: 234, label: '2020-04-09T12:00:00'},
      {rawValue: 645, label: '2020-04-10T12:00:00'},
      {rawValue: 543, label: '2020-04-11T12:00:00'},
      {rawValue: 89, label: '2020-04-12T12:00:00'},
      {rawValue: 849, label: '2020-04-13T12:00:00'},
      {rawValue: 129, label: '2020-04-14T12:00:00'},
    ],
    lineStyle: 'solid' as 'solid',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 709, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 710, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
      {rawValue: 623, label: '2020-03-13T12:00:00'},
      {rawValue: 21, label: '2020-03-14T12:00:00'},
    ],
    lineStyle: 'dotted' as 'dotted',
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
