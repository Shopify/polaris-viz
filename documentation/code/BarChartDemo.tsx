import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {BarChart, BarChartTooltipContent} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function BarChartDemo() {
  const innerContainerStyle = {
    width: '40%',
    height: '200px',
    // background: '#0E305E',
    padding: '20px',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = Array.from({length: 12}, (_, i) => {
    return {rawValue: Math.random() * 100, label: (i + 1).toString()};
  });

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
          color="blueGreenGradient"
          highlightColor="inverse"
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip chart content"
          // hasRoundedCorners
          // barMargin="Small"
          timeSeries
          // axisColor="#194685"
          // textColor="#8C9196"
          // crossHairColor="dark"
          hasRoundedCorners
        />
      </div>
    </div>
  );
}
