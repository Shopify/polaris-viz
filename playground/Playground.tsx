import React from 'react';

import {NormalizedStackedBar} from '../src/components';
import {
  Orientation,
  Size,
  ColorScheme,
} from '../src/components/NormalizedStackedBar';

const mockProps = {
  size: Size.Medium,
  // orientation: Orientation.Vertical,
  colors: ColorScheme.TwentyTwenty,
  accessibilityLabel: 'A chart showing data about something 🎉',
  data: [
    {
      label: 'Google',
      value: 100,
      formattedValue: '$100',
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
      <NormalizedStackedBar {...mockProps} />
    </div>
  );
}
