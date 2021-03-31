import React, {useState} from 'react';
import {condenseNumber} from '@shopify/condense-number';

import * as PlaygroundDemos from '../documentation/code';

import {
  NormalizedStackedBarChart,
  LineChart,
  BarChart,
} from '../src/components';

const barChartDataHourly = [
  {label: 0, rawValue: 47271},
  {label: 1, rawValue: 241364},
  {label: 2, rawValue: 183611},
  {label: 3, rawValue: 120139},
  {label: 4, rawValue: 101800},
  {label: 5, rawValue: 95066},
  {label: 6, rawValue: 112460},
  {label: 7, rawValue: 132169},
  {label: 8, rawValue: 148418},
  {label: 9, rawValue: 126096},
  {label: 10, rawValue: 136506},
  {label: 11, rawValue: 142222},
  {label: 12, rawValue: 140127},
  {label: 13, rawValue: 148693},
  {label: 14, rawValue: 154418},
  {label: 15, rawValue: 143930},
  {label: 16, rawValue: 154463},
  {label: 17, rawValue: 131992},
  {label: 18, rawValue: 116585},
  {label: 19, rawValue: 127812},
  {label: 20, rawValue: 132196},
  {label: 21, rawValue: 125438},
  {label: 22, rawValue: 106493},
  {label: 23, rawValue: 112769},
  {label: 24, rawValue: 109610},
  {label: 25, rawValue: 86819},
  {label: 26, rawValue: 79321},
  {label: 27, rawValue: 74689},
  {label: 28, rawValue: 58362},
  {label: 29, rawValue: 44410},
  {label: 30, rawValue: 45612},
  {label: 31, rawValue: 43374},
  {label: 32, rawValue: 34125},
  {label: 33, rawValue: 32474},
  {label: 34, rawValue: 34455},
  {label: 35, rawValue: 39934},
  {label: 36, rawValue: 40084},
  {label: 37, rawValue: 38308},
  {label: 38, rawValue: 29625},
  {label: 39, rawValue: 29650},
  {label: 40, rawValue: 29805},
  {label: 41, rawValue: 24727},
  {label: 42, rawValue: 22853},
  {label: 43, rawValue: 30961},
  {label: 44, rawValue: 33972},
  {label: 45, rawValue: 23263},
  {label: 46, rawValue: 20641},
  {label: 47, rawValue: 21170},
  {label: 48, rawValue: 20242},
  // {label: '49 +', rawValue: 811329},
];

const barChartDataDaily = [
  {label: 0, rawValue: 0},
  {label: 1, rawValue: 242},
  {label: 2, rawValue: 1333},
  {label: 3, rawValue: 2802},
  {label: 4, rawValue: 4146},
  {label: 5, rawValue: 5883},
  {label: 6, rawValue: 7990},
  {label: 7, rawValue: 10187},
  {label: 8, rawValue: 10869},
  {label: 9, rawValue: 9756},
  {label: 10, rawValue: 8453},
  {label: 11, rawValue: 7929},
  {label: 12, rawValue: 6584},
  {label: 13, rawValue: 5591},
  {label: 14, rawValue: 5066},
  {label: 15, rawValue: 4400},
  {label: 16, rawValue: 3660},
  {label: 17, rawValue: 3069},
  {label: 18, rawValue: 2620},
  {label: 19, rawValue: 2407},
  {label: 20, rawValue: 2270},
  {label: 21, rawValue: 2156},
  {label: 22, rawValue: 2254},
  {label: 23, rawValue: 2000},
  {label: 24, rawValue: 2201},
  {label: 25, rawValue: 2304},
  {label: 26, rawValue: 1885},
  {label: 27, rawValue: 1765},
  {label: 28, rawValue: 1701},
  {label: 29, rawValue: 1786},
  {label: 30, rawValue: 1748},
  {label: 31, rawValue: 1700},
  {label: 32, rawValue: 1756},
  {label: 33, rawValue: 1754},
  {label: 34, rawValue: 1855},
  {label: 35, rawValue: 2108},
  {label: 36, rawValue: 2260},
  {label: 37, rawValue: 2435},
  {label: 38, rawValue: 2355},
  {label: 39, rawValue: 2241},
  {label: 40, rawValue: 1941},
  {label: 41, rawValue: 1833},
  {label: 42, rawValue: 1393},
  {label: 43, rawValue: 1226},
  {label: 44, rawValue: 1054},
  {label: 45, rawValue: 966},
  {label: 46, rawValue: 929},
  {label: 47, rawValue: 801},
  {label: 48, rawValue: 750},
  {label: '49 +', rawValue: 15204},
];

export default function Playground() {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '300px',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <BarChart
          data={barChartDataDaily}
          color="blueWhiteGradient"
          skipLinkText="Skip chart content"
          timeSeries
          hasRoundedCorners
          barMargin="Small"
          linearAnnotation={{
            range: [0, 49],
            annotation: 10,
            description: 'Median: 9.9 days',
          }}
        />
      </div>
    </div>
  );
}
