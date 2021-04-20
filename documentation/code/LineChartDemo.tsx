import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {
  LineChart,
  LineChartProps,
  LineChartTooltipContent,
  Legend,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';
import weatherData from './data.json';

export function LineChartDemo() {
  const innerContainerStyle = {
    width: '100%',
    height: '300px',
    marginBottom: '20px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = weatherData.slice(0, 3000);

  const series = [
    {
      name: 'Apr 01–Apr 14, 2020',
      data,
      color: 'primary',
    },
  ];

  const xAxisLabels = series[0].data.map(({label}) => label);

  function formatXAxisLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'numeric',
    });
  }

  function formatYAxisLabel(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'CAD',
      currencyDisplay: 'symbol',
      maximumSignificantDigits: 1,
    }).format(value);
  }

  const renderTooltipContent: LineChartProps['renderTooltipContent'] = ({
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

    const formattedData = data.map(
      ({name, point: {label, value}, color, lineStyle}) => ({
        name,
        color,
        lineStyle,
        point: {
          value: formatTooltipValue(value),
          label: formatTooltipLabel(label),
        },
      }),
    );

    return <LineChartTooltipContent data={formattedData} />;
  };

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <LineChart
          series={series}
          xAxisLabels={xAxisLabels}
          // formatXAxisLabel={formatXAxisLabel}
          // formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip line chart content"
        />
      </div>
      <Legend series={series} />
    </div>
  );
}
