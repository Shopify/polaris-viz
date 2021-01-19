import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {BarChart, BarChartTooltipContent} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function BarChartDemo() {
  const innerContainerStyle = {
    // width: '900px',
    height: '400px',
    maxWidth: '100%',
    background: 'white',
    // padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    // display: 'grid',
    // placeItems: 'center',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = [
    {rawValue: 0, label: '2020-01-01T12:00:00Z'},
    {rawValue: 1, label: '2020-01-02T12:00:00Z'},
    {rawValue: 0, label: '2020-01-03T12:00:00Z'},
    {
      rawValue: 1,
      label: '2020-01-04T12:00:00Z',
    },
    {rawValue: 0, label: '2020-01-05T12:00:00Z'},
    {rawValue: 1, label: '2020-01-06T12:00:00Z'},
  ];

  function formatXAxisLabel(value: string) {
    // return new Date(value).toLocaleDateString('en-CA', {
    //   day: 'numeric',
    //   month: 'short',
    // });
    return `${value}`;
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
        />
      </div>
    </div>
  );
}
