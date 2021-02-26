import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {NormalizedStackedBarChart} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function NormalizedStackedBarChartDemo() {
  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <NormalizedStackedBarChart
          data={[
            {
              label: 'Direct',
              value: 200,
              formattedValue: '$200',
              comparisonMetric: {
                metric: '5',
                trend: 'positive',
                accessibilityLabel: 'Increase of',
              },
            },
            {
              label: 'Facebook',
              value: 100,
              formattedValue: '$100',
              comparisonMetric: {
                metric: '5',
                trend: 'negative',
                accessibilityLabel: 'Decrease of',
              },
            },
            {
              label: 'Twitter',
              value: 100,
              formattedValue: '$100',
            },
            {
              label: 'Google',
              value: 20,
              formattedValue: '$20',
            },
          ]}
          colors={['primary', 'secondary', 'tertiary', 'quaternary']}
          orientation="horizontal"
          size="large"
        />
      </div>
    </div>
  );
}
