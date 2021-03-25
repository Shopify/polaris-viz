import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {BarChart, BarChartTooltipContent} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function BarChartDemo() {
  const innerContainerStyle = {
    width: '100%',
    height: '300px',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = [
    {rawValue: 324.19, label: ''},
    {rawValue: 613.29, label: ''},
    {rawValue: 422.79, label: ''},
    {
      rawValue: 25.6,
      label: '',
    },
    {rawValue: 277.69, label: ''},
    {rawValue: 421.19, label: ''},
    {rawValue: 324.19, label: ''},
    {rawValue: 613.29, label: ''},
    {rawValue: 422.79, label: ''},
    {
      rawValue: 25.6,
      label: '',
    },
    {rawValue: 277.69, label: ''},
    {rawValue: 421.19, label: ''},
    {rawValue: 324.19, label: ''},
    {rawValue: 613.29, label: ''},
    {rawValue: 422.79, label: ''},
    {
      rawValue: 25.6,
      label: '',
    },
    {rawValue: 277.69, label: ''},
    {rawValue: 421.19, label: ''},
    {rawValue: 324.19, label: ''},
    {rawValue: 613.29, label: ''},
    {rawValue: 422.79, label: ''},
    {
      rawValue: 25.6,
      label: '',
    },
    {rawValue: 277.69, label: ''},
    {rawValue: 421.19, label: ''},
  ];

  function formatXAxisLabel(value: string, index: number) {
    return index;
  }

  function formatYAxisLabel(value: number) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumSignificantDigits: 2,
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
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <BarChart
          data={data}
          color="primaryGradient"
          hasRoundedCorners
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip chart content"
        />
      </div>
    </div>
  );
}
