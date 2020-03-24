import './Playground.scss';
import React from 'react';

import {LineChart} from '../src/components';
import {Series} from '../src/components/LineChart/types';

const formatDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
}).format;
const formatNumber = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}).format;

function generateData(): [string, number][] {
  return Array(6)
    .fill(null)
    .map((_, index) => [
      formatDate(new Date(2020, 0, index + 1)),
      Math.random() > 0.5 ? Math.random() * 1000 : Math.random() * -1000,
    ]);
}

const DATA = [
  [formatDate(new Date(2020, 0, 5)), 100],
  [formatDate(new Date(2020, 0, 6)), -40],
  [formatDate(new Date(2020, 0, 7)), -20],
  [formatDate(new Date(2020, 0, 8)), -40],
  [formatDate(new Date(2020, 0, 9)), 250],
  [formatDate(new Date(2020, 0, 10)), 100],
];

export default function Playground() {
  const series: Series[] = [
    {data: generateData(), name: 'secondary', style: {lineStyle: 'dashed'}},
    {data: DATA, name: 'primary', style: {color: 'teal'}},
  ];

  return (
    <div>
      <h4>Line chart!</h4>
      <div style={{height: '250px'}}>
        <LineChart
          series={series}
          xAxisLabels={series[0].data.map(([x]) => x)}
          formatYAxisValue={formatNumber}
        />
      </div>
    </div>
  );
}
