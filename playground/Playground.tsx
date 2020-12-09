import React from 'react';

import {LineChart} from '../src/components';

export default function Playground() {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const formatXAxisLabel = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-CA', {day: 'numeric', month: 'numeric'});
  };

  const formatYAxisLabel = new Intl.NumberFormat('en', {
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
      name: 'Nov. 20–Dec. 3 2020',
      data: [
        {rawValue: 2251, label: 'November 20, 2020'},
        {rawValue: 2132.2, label: 'November 21, 2020'},
        {rawValue: 5000, label: 'November 22, 2020'},
        {rawValue: 7200, label: 'November 23, 2020'},
        {rawValue: 1500, label: 'November 24, 2020'},
        {rawValue: 6132, label: 'November 25, 2020'},
        {rawValue: 3100, label: 'November 26, 2020'},
        // this would actually need to provide more info
        {rawValue: 22000, label: 'November 27, 2020', annotate: true},
        {rawValue: 5103, label: 'November 28, 2020'},
        {rawValue: 2112.5, label: 'November 29, 2020'},
        {rawValue: 4004, label: 'November 30, 2020', prediction: true},
        {rawValue: 6000, label: 'December 1, 2020', prediction: true},
        {rawValue: 5500, label: 'December 2, 2020', prediction: true},
        {rawValue: 7000, label: 'December 3, 2020', prediction: true},
      ],
      style: {
        color: 'primary',
      },
      formatY,
    },
    {
      name: 'Oct. 10-Oct. 23, 2020',
      data: [
        {rawValue: 5200, label: 'October 10, 2020'},
        {rawValue: 7000, label: 'October 11, 2020'},
        {rawValue: 1000, label: 'October 12, 2020'},
        {rawValue: 2000, label: 'October 13, 2020'},
        {rawValue: 5000, label: 'October 14, 2020'},
        {rawValue: 1000, label: 'October 15, 2020'},
        {rawValue: 2000, label: 'October 16, 2020'},
        {rawValue: 5000, label: 'October 17, 2020'},
        {rawValue: 4000, label: 'October 18, 2020'},
        {rawValue: 1120, label: 'October 19, 2020'},
        {rawValue: 2000, label: 'October 20, 2020'},
        {rawValue: 3000, label: 'October 21, 2020'},
        {rawValue: 2000, label: 'October 22, 2020'},
        {rawValue: 3000, label: 'October 23, 2020'},
      ],
      style: {
        color: 'pastComparison',
        lineStyle: 'dashed' as 'dashed',
      },
      formatY,
    },
  ];

  const xAxisLabels = series[0].data.map(({label}) => label);

  return (
    <div
      style={{
        width: '900px',
        background: 'white',
        padding: '2rem',
        borderRadius: '6px',
        border: '2px solid #EAECEF',
      }}
    >
      <LineChart
        chartHeight={229}
        xAxisLabels={xAxisLabels}
        formatXAxisLabel={formatXAxisLabel}
        formatYAxisLabel={formatYAxisLabel}
        series={series}
      />
    </div>
  );
}
