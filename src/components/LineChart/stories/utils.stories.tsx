import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {LineChartTooltipContent, LineChartProps} from '../../../components';
import {vizColors} from '../../../utilities';

const polarisTokensColors = Object.keys(tokens).filter((key) =>
  key.startsWith('color'),
);

export const colorOptions: string[] = Object.keys(vizColors).concat(
  polarisTokensColors,
);

export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};

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

  const formattedData = data.map(({name, point: {label, value}, style}) => ({
    name,
    style,
    point: {
      value: formatTooltipValue(value),
      label: formatTooltipLabel(label),
    },
  }));

  return <LineChartTooltipContent data={formattedData} />;
};
