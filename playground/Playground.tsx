import React, {useState} from 'react';

import * as PlaygroundDemos from '../documentation/code';

import {NormalizedStackedBarChart} from '../src/components';

const Demos = () => {
  return (
    <>
      {Object.entries(PlaygroundDemos).map(([title, Component]) => {
        return (
          <span key={title}>
            <h3>{title}</h3>
            <Component />
          </span>
        );
      })}
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
      comparisonMetric: {
        trend: 'neutral' as 'neutral',
        metric: '5',
        accessibilityLabel: 'Neutral',
      },
    },
    {
      label: 'Direct',
      value: 500,
      formattedValue: '$500',
      comparisonMetric: {
        trend: 'positive' as 'positive',
        metric: '5',
        accessibilityLabel: 'Increase of',
      },
    },
    {
      label: 'Facebook',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        trend: 'negative' as 'positive',
        metric: '5',
        accessibilityLabel: 'Decrease of',
      },
    },
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
      <Demos />
    </div>
  );
}
