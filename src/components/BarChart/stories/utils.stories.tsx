import React from 'react';

import {BarChartTooltipContent} from 'components';

import {Annotation} from 'components/BarChart/types';

export function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
}

export function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'short',
  });
}

export const defaultProps = {
  data: [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: -422.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 0, label: '2020-01-04T12:00:00Z'},
    {rawValue: 1, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ],
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
  },
  renderTooltipContent,
  isAnimated: true,
};

export const getDataPoint = (limit = 1000, allowNegative = false) => {
  if (allowNegative)
    return (
      Math.ceil(Math.random() * limit) * (Math.round(Math.random()) ? 1 : -1)
    );
  return Math.random() * limit;
};

export function renderTooltipContent({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  function formatTooltipLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  const formattedLabel = formatTooltipLabel(label);
  const formattedValue = formatTooltipValue(value);

  return (
    <BarChartTooltipContent label={formattedLabel} value={formattedValue} />
  );
}

export function renderTooltipContentWithAnnotation({
  value,
  annotation,
}: {
  value: number;
  annotation?: Annotation;
}) {
  function formatTooltipLabel() {
    return 'Orders fulfilled';
  }
  const formattedLabel = formatTooltipLabel();
  const formattedValue = `${value}`;
  return (
    <BarChartTooltipContent
      label={formattedLabel}
      value={formattedValue}
      annotation={annotation}
    />
  );
}

export function formatLabelNoop(value: string | number) {
  return value;
}
