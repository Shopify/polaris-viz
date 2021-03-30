import React, {useState} from 'react';
import {condenseNumber} from '@shopify/condense-number';

import * as PlaygroundDemos from '../documentation/code';

import {
  NormalizedStackedBarChart,
  LineChart,
  BarChart,
} from '../src/components';

const barChartData = [
  {label: 0, rawValue: 2877.0},
  {label: 1, rawValue: 2839.0},
  {label: 2, rawValue: 2507.0},
  {label: 3, rawValue: 2947.0},
  {label: 4, rawValue: 1867.0},
  {label: 5, rawValue: 2981.0},
  {label: 6, rawValue: 333.0},
  {label: 7, rawValue: 3290.0},
  {label: 8, rawValue: 1945.0},
  {label: 9, rawValue: 1976.0},
  {label: 10, rawValue: 3130.0},
  {label: 11, rawValue: 2733.0},
  {label: 12, rawValue: 2062.0},
  {label: 13, rawValue: 148.0},
  {label: 14, rawValue: 2303.0},
  {label: 15, rawValue: 2279.0},
  {label: 16, rawValue: 2360.0},
  {label: 17, rawValue: 1562.0},
  {label: 18, rawValue: 2611.0},
  {label: 19, rawValue: 3269.0},
  {label: 20, rawValue: 135.0},
  {label: 21, rawValue: 1939.0},
  {label: 22, rawValue: 2173.0},
  {label: 23, rawValue: 1643.0},
  {label: 24, rawValue: 2469.0},
  {label: 25, rawValue: 1885.0},
  // {label: 26, rawValue: 0.0},
  // {label: 27, rawValue: 0.0},
  // {label: 28, rawValue: 0.0},
  // {label: 29, rawValue: 0.0},
];

export default function Playground() {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '350px',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <BarChart
          data={barChartData}
          color="blueWhiteGradient"
          skipLinkText="Skip chart content"
          timeSeries
          hasRoundedCorners
          barMargin="Small"
          linearAnnotation={{
            range: [0, 26],
            annotation: 10.5,
            description: 'Median: 10.5 days',
          }}
        />
      </div>
    </div>
  );
}
