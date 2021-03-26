import React, {useState} from 'react';
import {condenseNumber} from '@shopify/condense-number';

import * as PlaygroundDemos from '../documentation/code';

import {
  NormalizedStackedBarChart,
  LineChart,
  BarChart,
} from '../src/components';

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

const barChartData = Array.from({length: 20}, (_, i) => {
  return {rawValue: Math.random() * 100, label: i.toString()};
});

const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 2251, label: '2020-04-01T12:00:00'},
      {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
      {rawValue: 5000, label: '2020-04-03T12:00:00'},
      {rawValue: 7200, label: '2020-04-04T12:00:00'},
      {rawValue: 1500, label: '2020-04-05T12:00:00'},
      {rawValue: 6132, label: '2020-04-06T12:00:00'},
      {rawValue: 3100, label: '2020-04-07T12:00:00'},
      {rawValue: 2200, label: '2020-04-08T12:00:00'},
      {rawValue: 5103, label: '2020-04-09T12:00:00'},
      {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
      {rawValue: 4004, label: '2020-04-11T12:00:00'},
      {rawValue: 6000, label: '2020-04-12T12:00:00'},
      {rawValue: 5500, label: '2020-04-13T12:00:00'},
      {rawValue: 7000, label: '2020-04-14T12:00:00'},
    ],
    color: 'quaternary',
    lineStyle: 'solid' as 'solid',
    showArea: true,
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 5200, label: '2020-03-01T12:00:00'},
      {rawValue: 7000, label: '2020-03-02T12:00:00'},
      {rawValue: 1000, label: '2020-03-03T12:00:00'},
      {rawValue: 2000, label: '2020-03-04T12:00:00'},
      {rawValue: 5000, label: '2020-03-05T12:00:00'},
      {rawValue: 1000, label: '2020-03-06T12:00:00'},
      {rawValue: 2000, label: '2020-03-07T12:00:00'},
      {rawValue: 5000, label: '2020-03-08T12:00:00'},
      {rawValue: 4000, label: '2020-03-09T12:00:00'},
      {rawValue: 11200, label: '2020-03-10T12:00:00'},
      {rawValue: 2000, label: '2020-03-11T12:00:00'},
      {rawValue: 3000, label: '2020-03-12T12:00:00'},
      {rawValue: 2000, label: '2020-03-13T12:00:00'},
      {rawValue: 3000, label: '2020-03-14T12:00:00'},
    ],
    color: 'pastComparison' as 'pastComparison',
    lineStyle: 'dashed' as 'dashed',
  },
];

export default function Playground() {
  const [showDemos, setShowDemos] = useState(false);
  const toggleDemos = () => setShowDemos((showingDemos) => !showingDemos);

  return (
    // <div style={{background: '#0E305E'}}>
    <div>
      {/* <h3>Playground area</h3>
      <NormalizedStackedBarChart
        size="large"
        // orientation="vertical"
        {...mockProps}
      />
      <br />
      <button onClick={toggleDemos}>Toggle Demos</button>
      {showDemos && <Demos />} */}

      <div
        style={{
          width: '40%',
          height: '200px',
          background: '#0E305E',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <BarChart
          data={barChartData}
          color="blueWhiteGradient"
          // formatXAxisLabel={formatXAxisLabel}
          // formatYAxisLabel={formatYAxisLabel}
          // renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip chart content"
          // hasRoundedCorners
          // barMargin="Small"
          timeSeries
          axisColor="#194685"
          textColor="#8C9196"
          crossHairColor="dark"
          hasRoundedCorners
        />
      </div>

      <PlaygroundDemos.LineChartDemo />

      <div
        style={{
          marginTop: '5px',
        }}
      >
        <PlaygroundDemos.BarChartDemo />
      </div>
      {/*
      <PlaygroundDemos.BarChartDemo />
      <PlaygroundDemos.MultiSeriesBarChartDemo /> */}

      {/* <div
        style={{
          width: '90%',
          height: '300px',
          background: '#0E305E',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <LineChart
          series={series}
          xAxisLabels={[]}
          hasSpline
          axisColor="#194685"
          textColor="#8C9196"
          crossHairColor="dark"
          formatYAxisLabel={(e) => condenseNumber(e, 'en')}
        />
      </div> */}
    </div>
  );
}
