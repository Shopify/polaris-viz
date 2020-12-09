import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {BarChart} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function BarChartDemo() {
  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'grid',
    placeItems: 'center',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = [
    {rawValue: 3.19, label: 'Chicago Hot Dog'},
    {rawValue: 6.29, label: 'Italian Beef'},
    {rawValue: 4.79, label: 'Polish Sausage'},
    {
      rawValue: 0.6,
      label: 'Hot Peppers',
    },
    {rawValue: 2.69, label: 'French Fries'},
    {rawValue: 4.19, label: 'Cake Shake'},
  ];

  const formatYAxisLabel = (val) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumSignificantDigits: 3,
    }).format(val);

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <BarChart
          formatYAxisLabel={formatYAxisLabel}
          color="primary"
          data={data}
        />
      </div>
    </div>
  );
}
