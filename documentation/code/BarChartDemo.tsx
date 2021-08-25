import React from 'react';

import {BarChart, BarChartTooltipContent} from '../../src/components';

export function BarChartDemo({theme = 'Default'}) {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
    {
      rawValue: 25.6,
      label: '2020-01-04T12:00:00Z',
    },
    {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ];

  function formatXAxisLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'short',
    });
  }

  function formatYAxisLabel(value: number) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  function renderTooltipContent({
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

  return (
    <BarChart
      theme={theme}
      data={data}
      xAxisOptions={{
        labelFormatter: formatXAxisLabel,
      }}
      yAxisOptions={{
        labelFormatter: formatYAxisLabel,
      }}
      renderTooltipContent={renderTooltipContent}
      skipLinkText="Skip chart content"
    />
  );
}
