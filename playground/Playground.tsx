import React, {useState} from 'react';

import {
  BarChartDemo,
  LineChartDemo,
  MultiSeriesBarChartDemo,
  NormalizedStackedBarChartDemo,
  SparklineDemo,
  StackedAreaChartDemo,
} from '../documentation/code';

import {NormalizedStackedBarChart} from '../src/components';

const Demos = () => {
  return (
    <>
      <h3>Bar Chart Demo</h3>
      <BarChartDemo />
      <h3>Line Chart Demo</h3>
      <LineChartDemo />
      <h3>Multi Series Bar Chart Demo</h3>
      <MultiSeriesBarChartDemo />
      <h3>Normalized Stacked Bar Chart Demo</h3>
      <NormalizedStackedBarChartDemo />
      <h3>Sparkline Demo</h3>
      <SparklineDemo />
      <h3>Stacked Area Chart Demo</h3>
      <StackedAreaChartDemo />
    </>
  );
};

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
  const [showDemos, setShowDemos] = useState(false);
  const toggleDemos = () => setShowDemos((showingDemos) => !showingDemos);

  return (
    <div>
      <h3>Playground area</h3>
      <NormalizedStackedBarChart
        size="large"
        // orientation="vertical"
        {...mockProps}
      />
      <br />
      <button onClick={toggleDemos}>Toggle Demos</button>
      {showDemos && <Demos />}
    </div>
  );
}
