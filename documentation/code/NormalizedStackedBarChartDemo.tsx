import React from 'react';

import {NormalizedStackedBarChart} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function NormalizedStackedBarChartDemo() {
  const innerContainerStyle = {
    height: '300px',
    padding: '2rem',
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
              comparisonMetric: {
                metric: '5',
                trend: 'neutral',
                accessibilityLabel: 'Decrease of',
              },
            },
            {
              label: 'Google',
              value: 20,
              formattedValue: '$20',
            },
          ]}
          orientation="horizontal"
          size="large"
        />
      </div>
    </div>
  );
}
