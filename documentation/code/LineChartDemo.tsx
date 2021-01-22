import React from 'react';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  LineChart,
  LineChartProps,
  LineChartTooltipContent,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function LineChartDemo() {
  const innerContainerStyle = {
    width: '900px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series = [
    {
      name: 'Apr 01–Apr 14, 2020',
      data: [
        {rawValue: 2251, label: '2020-04-01T12:00:00'},
        {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
        {rawValue: 5000, label: '2020-04-03T12:00:00'},
        {rawValue: 7200, label: '2020-04-04T12:00:00'},
        {rawValue: 1500, label: '2020-04-05T12:00:00'},
        {rawValue: 6132, label: '2020-04-06T12:00:00'},
        {rawValue: 3100, label: '2020-04-07T12:00:00'},
        {rawValue: 2200, label: '2020-04-08T12:00:00'},
        {rawValue: 5103, label: '2020-04-09T12:00:00'},
        {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
        {rawValue: 4004, label: '2020-04-11T12:00:00'},
        {rawValue: 6000, label: '2020-04-12T12:00:00'},
        {rawValue: 5500, label: '2020-04-13T12:00:00'},
        {rawValue: 7000, label: '2020-04-14T12:00:00'},
      ],
      style: {
        color: 'primary',
      },
    },
    {
      name: 'Mar 01–Mar 14, 2020',
      data: [
        {rawValue: 5200, label: '2020-03-01T12:00:00'},
        {rawValue: 7000, label: '2020-03-02T12:00:00'},
        {rawValue: 1000, label: '2020-03-03T12:00:00'},
        {rawValue: 2000, label: '2020-03-04T12:00:00'},
        {rawValue: 5000, label: '2020-03-05T12:00:00'},
        {rawValue: 1000, label: '2020-03-06T12:00:00'},
        {rawValue: 2000, label: '2020-03-07T12:00:00'},
        {rawValue: 5000, label: '2020-03-08T12:00:00'},
        {rawValue: 4000, label: '2020-03-09T12:00:00'},
        {rawValue: 11200, label: '2020-03-10T12:00:00'},
        {rawValue: 2000, label: '2020-03-11T12:00:00'},
        {rawValue: 3000, label: '2020-03-12T12:00:00'},
        {rawValue: 2000, label: '2020-03-13T12:00:00'},
        {rawValue: 3000, label: '2020-03-14T12:00:00'},
      ],
      style: {
        color: 'pastComparison',
        lineStyle: 'dashed' as 'dashed',
      },
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

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <LineChart
          series={series}
          chartHeight={229}
          xAxisLabels={xAxisLabels}
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
        />
      </div>
    </div>
  );
}
