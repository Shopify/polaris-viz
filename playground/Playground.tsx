import React from 'react';

import {NormalizedStackedBarChart} from '../src/components';
import {Orientation, Size} from '../src/components/NormalizedStackedBarChart';

const mockProps = {
  // size: Size.Small,
  accessibilityLabel: 'A chart showing data about something 🎉',
  data: [
    {
      label: 'Google',
      value: 0,
      formattedValue: '$0',
    },
    {
      label: 'Direct',
      value: 500,
      formattedValue: '$500',
    },
    {label: 'Facebook', value: 100, formattedValue: '$100'},
    {label: 'Twitter', value: 100, formattedValue: '$100'},
    // {label: 'a fith data item', value: 1090000, formattedValue: '$1090000'},
  ],
};

export default function Playground() {
  return (
    <div style={{height: '501px', margin: '40px'}}>
      <NormalizedStackedBarChart
        size="large"
        // orientation="vertical"
        {...mockProps}
      />
    </div>
  );
}
