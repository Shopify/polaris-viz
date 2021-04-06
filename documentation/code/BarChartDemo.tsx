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
    {rawValue: 324.19, label: '0'},
    {rawValue: 613.29, label: '1'},
    {rawValue: 422.79, label: '2'},
    {
      rawValue: 25.6,
      label: '3',
    },
    {rawValue: 277.69, label: '4'},
    {rawValue: 421.19, label: '5'},
    {rawValue: 324.19, label: '6'},
    {rawValue: 613.29, label: '7'},
    {rawValue: 422.79, label: '8'},
    {
      rawValue: 25.6,
      label: '9',
    },
    {rawValue: 277.69, label: '10'},
    {rawValue: 421.19, label: '11'},
    {rawValue: 324.19, label: '12'},
    {rawValue: 613.29, label: '13'},
    {rawValue: 422.79, label: '14'},
    {
      rawValue: 25.6,
      label: '15',
    },
    {rawValue: 277.69, label: '16'},
    {rawValue: 421.19, label: '17'},
    {rawValue: 324.19, label: '18'},
    {rawValue: 613.29, label: '19'},
    {rawValue: 422.79, label: '20'},
    {
      rawValue: 25.6,
      label: '21',
    },
    {rawValue: 277.69, label: '22'},
    {rawValue: 421.19, label: '23'},
  ];

  function formatXAxisLabel(value: string) {
    return value;
    // return new Date(value).toLocaleDateString('en-CA', {
    //   day: 'numeric',
    //   month: 'short',
    // });
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
          color="primary"
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip chart content"
          timeSeries
          leftAlignedAxis
          barMargin="Small"
        />
      </div>
    </div>
  );
}
