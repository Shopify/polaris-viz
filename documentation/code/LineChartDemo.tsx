import React, {useState} from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {
  LineChart,
  LineChartProps,
  LineChartTooltipContent,
  Legend,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function LineChartDemo() {
  const innerContainerStyle = {
    width: '100%',
    height: '300px',
    marginBottom: '20px',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series1 = [
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
      color: 'primary' as 'primary',
      lineStyle: 'solid' as 'solid',
      showArea: true,
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
      color: 'pastComparison' as 'pastComparison',
      lineStyle: 'dashed' as 'dashed',
      showArea: true,
    },
  ];

  const series2 = [
    {
      name: 'May 01–May 14, 2021',
      data: [
        {rawValue: 251, label: '2020-05-01T12:00:00'},
        {rawValue: 3000, label: '2020-05-03T12:00:00'},
        {rawValue: 2500, label: '2020-05-04T12:00:00'},
        {rawValue: 1200, label: '2020-05-05T12:00:00'},
        {rawValue: 5000, label: '2020-05-04T12:00:00'},
        {rawValue: 7000, label: '2020-05-05T12:00:00'},
        {rawValue: 4000, label: '2020-05-06T12:00:00'},
        {rawValue: 5132, label: '2020-05-06T12:00:00'},
        {rawValue: 4200, label: '2020-05-08T12:00:00'},
        {rawValue: 7103, label: '2020-05-09T12:00:00'},
        {rawValue: 1112.5, label: '2020-05-10T12:00:00'},
        {rawValue: 2004, label: '2020-05-11T12:00:00'},
        {rawValue: 5000, label: '2020-05-12T12:00:00'},
        {rawValue: 7000, label: '2020-05-14T12:00:00'},
        {rawValue: 7112.5, label: '2020-05-10T12:00:00'},
        {rawValue: 2004, label: '2020-05-11T12:00:00'},
        {rawValue: 5000, label: '2020-05-12T12:00:00'},
      ],
      color: 'secondary' as 'secondary',
      lineStyle: 'solid' as 'solid',
      showArea: true,
    },
    {
      name: 'Apr 01–Apr 14, 2021',
      data: [
        {rawValue: 2251, label: '2020-04-01T12:00:00'},
        {rawValue: 5000, label: '2020-04-03T12:00:00'},
        {rawValue: 7200, label: '2020-04-04T12:00:00'},
        {rawValue: 1500, label: '2020-04-05T12:00:00'},
        {rawValue: 2000, label: '2020-03-04T12:00:00'},
        {rawValue: 5000, label: '2020-03-05T12:00:00'},
        {rawValue: 1000, label: '2020-03-06T12:00:00'},
        {rawValue: 6132, label: '2020-04-06T12:00:00'},
        {rawValue: 2200, label: '2020-04-08T12:00:00'},
        {rawValue: 5103, label: '2020-04-09T12:00:00'},
        {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
        {rawValue: 4004, label: '2020-04-11T12:00:00'},
        {rawValue: 6000, label: '2020-04-12T12:00:00'},
        {rawValue: 7000, label: '2020-04-14T12:00:00'},
        {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
        {rawValue: 4004, label: '2020-04-11T12:00:00'},
        {rawValue: 6000, label: '2020-04-12T12:00:00'},
      ],
      color: 'primary' as 'primary',
      lineStyle: 'solid' as 'solid',
      showArea: true,
    },
    {
      name: 'Mar 01–Mar 14, 2021',
      data: [
        {rawValue: 7000, label: '2020-03-02T12:00:00'},
        {rawValue: 1000, label: '2020-03-03T12:00:00'},
        {rawValue: 5000, label: '2020-03-08T12:00:00'},
        {rawValue: 4000, label: '2020-03-09T12:00:00'},
        {rawValue: 5200, label: '2020-03-01T12:00:00'},
        {rawValue: 2000, label: '2020-03-07T12:00:00'},
        {rawValue: 3000, label: '2020-03-14T12:00:00'},
        {rawValue: 2000, label: '2020-03-13T12:00:00'},
        {rawValue: 2000, label: '2020-03-11T12:00:00'},
        {rawValue: 11200, label: '2020-03-10T12:00:00'},
        {rawValue: 3000, label: '2020-03-12T12:00:00'},
        {rawValue: 7000, label: '2020-03-02T12:00:00'},
        {rawValue: 1000, label: '2020-03-03T12:00:00'},
        {rawValue: 5000, label: '2020-03-08T12:00:00'},
        {rawValue: 4000, label: '2020-03-09T12:00:00'},
        {rawValue: 5200, label: '2020-03-01T12:00:00'},
        {rawValue: 4000, label: '2020-03-09T12:00:00'},
      ],
      color: 'pastComparison' as 'pastComparison',
      lineStyle: 'dashed' as 'dashed',
      showArea: true,
    },
  ];

  const series = [series1, series2];

  const [index, setIndex] = useState(0);

  const xAxisLabels = series[index][0].data.map(({label}) => label);

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
        showArea: true,
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
      <button
        onClick={() => {
          setIndex(index ? 0 : 1);
        }}
      >
        Change data
      </button>
      <div style={innerContainerStyle}>
        <LineChart
          series={series[index]}
          xAxisLabels={xAxisLabels}
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip line chart content"
          isAnimated
        />
      </div>
      <Legend series={series[index]} />
    </div>
  );
}
