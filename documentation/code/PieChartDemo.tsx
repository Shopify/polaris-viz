import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {PieChart} from '../../src/components';

const mockProps = [
  {
    label: 'Google',
    value: 45,
    formattedValue: '$45',
  },
  {label: 'Facebook', value: 70, formattedValue: '$70'},
  {label: 'Twitter', value: 200, formattedValue: '$200'},
];

export function PieChartDemo() {
  return (
    // A width so the pie chart and legend does not try to take the full width of the screen
    <div style={{width: '500px'}}>
      <PieChart data={mockProps} outerRadius={150} />
    </div>
  );
}
