import React from 'react';
import {LineChartTooltipContent} from '@shopify/polaris-viz';
import type {LineChartTooltipContentProps} from '@shopify/polaris-viz';

export function formatXAxisLabel(value) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'numeric',
  });
}

export function formatYAxisLabel(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'symbol',
  }).format(value);
}

export const renderTooltipContent = ({
  data,
}: {
  data: LineChartTooltipContentProps['data'];
}) => {
  function formatTooltipValue(value) {
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

  return <LineChartTooltipContent data={formattedData} />;
};

export function formatHourlyLabel(value: string) {
  const formatter = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
  });

  return formatter
    .format(new Date(value))
    .toLocaleLowerCase()
    .replace('am', 'a.m.')
    .replace('pm', 'p.m.');
}
