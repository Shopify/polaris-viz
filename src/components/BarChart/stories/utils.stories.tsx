import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {Color} from '../../../types';
import {BarChartTooltipContent} from '../../../components';
import {vizColors} from '../../../utilities';
import {Annotation} from '../types';

const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] = Object.keys(vizColors).concat(
  polarisTokensColors,
);

export const primaryColor = colorOptions[0] as Color;
export const secondaryColor = colorOptions[1] as Color;

export const getDataPoint = (limit = 1000, allowNegative = false) => {
  if (allowNegative)
    return (
      Math.ceil(Math.random() * limit) * (Math.round(Math.random()) ? 1 : -1)
    );
  return Math.random() * limit;
};

export function formatNoOperation(value: string | number) {
  return value;
}

export function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumSignificantDigits: 2,
  }).format(value);
}

export function renderTooltipContent({
  label,
  value,
  annotation,
}: {
  label: string;
  value: number;
  annotation: Annotation;
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
    <BarChartTooltipContent
      label={formattedLabel}
      value={formattedValue}
      annotation={annotation}
    />
  );
}
export function renderTooltipContentWithAnnotations({
  value,
  annotation,
}: {
  value: number;
  annotation: Annotation;
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

export const chartData = [
  {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
  {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
  {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
  {rawValue: 25.6, label: '2020-01-04T12:00:00Z'},
  {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
  {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
];

export const histogramChartData = [
  {rawValue: 10, label: '0'},
  {
    rawValue: 45,
    label: '1',
    annotation: {
      width: 5,
      color: 'colorTealLight',
      tooltipData: {
        label: 'Median',
        value: '1.5 hours',
      },
      ariaLabel: 'Median 1.5 hours',
      xOffset: 0.5,
    },
  },
  {rawValue: 20, label: '2'},
  {rawValue: 9, label: '3'},
  {rawValue: 32, label: '4'},
  {rawValue: 85, label: '5'},
  {rawValue: 74, label: '6'},
  {rawValue: 100, label: '7'},
  {rawValue: 58, label: '8'},
  {rawValue: 40, label: '9'},
  {rawValue: 58, label: '10'},
  {rawValue: 64, label: '11'},
  {rawValue: 9, label: '12'},
  {rawValue: 26, label: '13'},
  {rawValue: 34, label: '14'},
  {rawValue: 50, label: '15'},
  {rawValue: 56, label: '16'},
  {rawValue: 85, label: '17'},
  {rawValue: 2, label: '18'},
  {rawValue: 52, label: '19'},
];
