import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {BarChartTooltipContent} from '../../../components';
import {vizColors} from '../../../utilities';

import {Color} from '../../../types';
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
