import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {LineChart} from '../../src/components';

// eslint-disable-next-line import/no-default-export
export default function LineChartDemo() {
  const outerContainerStyle = {background: 'white', padding: '3rem'};
  const innerContainerStyle = {
    width: '900px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const formatAxisValue = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'narrowSymbol',
  }).format;
  const formatY = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
  }).format;

  const series = [
    {
      name: 'Apr 01–Apr 14, 2020',
      data: [
        {rawValue: 2251, label: 'April 01, 2020'},
        {rawValue: 12132.2, label: 'April 02, 2020'},
        {rawValue: 5000, label: 'April 03, 2020'},
        {rawValue: 7200, label: 'April 04, 2020'},
        {rawValue: 1500, label: 'April 05, 2020'},
        {rawValue: 6132, label: 'April 06, 2020'},
        {rawValue: 3100, label: 'April 07, 2020'},
        {rawValue: 2200, label: 'April 08, 2020'},
        {rawValue: 5103, label: 'April 09, 2020'},
        {rawValue: 2112.5, label: 'April 10, 2020'},
        {rawValue: 4004, label: 'April 11, 2020'},
        {rawValue: 6000, label: 'April 12, 2020'},
        {rawValue: 5500, label: 'April 13, 2020'},
        {rawValue: 7000, label: 'April 14, 2020'},
      ],
      style: {
        color: 'primary',
      },
      formatY,
    },
    {
      name: 'Mar 01–Mar 14, 2020',
      data: [
        {rawValue: 5200, label: 'March 01, 2020'},
        {rawValue: 7000, label: 'March 02, 2020'},
        {rawValue: 1000, label: 'March 03, 2020'},
        {rawValue: 2000, label: 'March 04, 2020'},
        {rawValue: 5000, label: 'March 05, 2020'},
        {rawValue: 1000, label: 'March 06, 2020'},
        {rawValue: 2000, label: 'March 07, 2020'},
        {rawValue: 5000, label: 'March 08, 2020'},
        {rawValue: 4000, label: 'March 09, 2020'},
        {rawValue: 11200, label: 'March 10, 2020'},
        {rawValue: 2000, label: 'March 11, 2020'},
        {rawValue: 3000, label: 'March 12, 2020'},
        {rawValue: 2000, label: 'March 13, 2020'},
        {rawValue: 3000, label: 'March 14, 2020'},
      ],
      style: {
        color: 'pastComparison',
        lineStyle: 'dashed' as 'dashed',
      },
      formatY,
    },
  ];

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-CA', {day: 'numeric', month: 'numeric'});
  const xAxisLabels = series[0].data.map(
    ({label}) => `${formatDate(new Date(label))}`,
  );

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <LineChart
          xAxisLabels={xAxisLabels}
          formatYAxisValue={formatAxisValue}
          series={series}
        />
      </div>
    </div>
  );
}
