import React from 'react';
import {MultiSeriesBarChartProps} from '../MultiSeriesBarChart';
import {TooltipContent} from '../../../components';

export const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getDataPoint = (limit = 20) => {
  return Math.floor(Math.random() * limit);
};

export const formatYAxisLabel = (val: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumSignificantDigits: 3,
  }).format(val);

export const renderTooltipContent: MultiSeriesBarChartProps['renderTooltipContent'] = ({
  data,
  title,
}) => {
  const formatTooltipValue = (val: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(val);

  const formattedData = data.map(({label, value, color}) => ({
    color,
    label,
    value: formatTooltipValue(value),
  }));

  const total = data.reduce((totalValue, {value}) => totalValue + value, 0);

  return (
    <TooltipContent
      title={title}
      data={formattedData}
      total={{label: 'Total', value: formatTooltipValue(total)}}
    />
  );
};
