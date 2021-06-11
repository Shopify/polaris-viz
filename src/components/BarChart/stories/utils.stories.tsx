import React from 'react';
import tokens, {colorSky} from '@shopify/polaris-tokens';

import {BarChartTooltipContent} from '../../../components';
import {vizColors} from '../../../utilities';

import {Color} from '../../../types';
import {Annotation, BarMargin} from '../types';
import {DEFAULT_GREY_LABEL} from '../../../constants';

const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] =
  Object.keys(vizColors).concat(polarisTokensColors);

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

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

const barGradient = [
  {
    color: negativePurple,
    offset: 0,
  },
  {
    color: purple,
    offset: 50,
  },
  {
    color: green,
    offset: 100,
  },
];

export const defaultProps = {
  data: [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: -422.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 0, label: '2020-01-04T12:00:00Z'},
    {rawValue: 1, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ],
  barOptions: {
    innerMargin: 'Medium',
    outerMargin: 'Medium',
    color: barGradient,
    hasRoundedCorners: true,
    zeroAsMinHeight: false,
  },
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
    showTicks: false,
    labelColor: DEFAULT_GREY_LABEL,
    useMinimalLabels: false,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
    labelColor: DEFAULT_GREY_LABEL,
    backgroundColor: 'transparent',
    integersOnly: false,
  },
  renderTooltipContent,
  gridOptions: {
    horizontalOverflow: false,
    showHorizontalLines: true,
    horizontalMargin: 0,
    color: colorSky,
  },
  isAnimated: true,
};

export const primaryColor = colorOptions[0] as Color;
export const secondaryColor = colorOptions[1] as Color;

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
