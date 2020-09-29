import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {StackedAreaChart} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function StackedAreaChartDemo() {
  function formatNumber(date: any) {
    const formatter = new Intl.NumberFormat('en').format;
    if (date == null) {
      return '-';
    }
    return formatter(date);
  }

  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series = [
    {
      label: 'First-time',
      data: [4237, 5024, 5730, 5587, 5303, 5634, 3238],
      color: 'primary',
    },
    {
      label: 'Returning',
      data: [5663, 7349, 9795, 7396, 7028, 12484, 4878],
      color: 'secondary',
    },
  ];
  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <StackedAreaChart
          formatYAxisValue={formatNumber}
          xAxisLabels={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ]}
          series={series}
        />
      </div>
    </div>
  );
}
