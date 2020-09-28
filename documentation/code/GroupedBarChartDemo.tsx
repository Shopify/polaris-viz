import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {GroupedBarChart} from '../../src/components';

// eslint-disable-next-line import/no-default-export
export default function GroupedBarChartDemo() {
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

  const series = [
    {
      color: 'primary',
      label: 'Breakfast',
      data: [3, 7, 4, 8, 10, 0, 1],
    },
    {
      color: 'secondary',
      label: 'Lunch',
      data: [4, 3, 5, 15, 8, 10, 2],
    },
    {
      color: 'tertiary',
      label: 'Dinner',
      data: [7, 2, 6, 12, 10, 5, 3],
    },
  ];

  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const formatYValue = (val: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumSignificantDigits: 3,
    }).format(val);

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <GroupedBarChart
          formatYValue={formatYValue}
          labels={labels}
          series={series}
        />
      </div>
    </div>
  );
}
