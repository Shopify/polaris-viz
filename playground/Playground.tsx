import React, {useState} from 'react';
import {colorSky, colorSkyDark, colorBlue} from '@shopify/polaris-tokens';

import {AreaChart} from '../src/components';

const formatNumber = new Intl.NumberFormat('en').format;
const formatDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
}).format;

export default function Playground() {
  const [randomNumbers, setRandomNumbers] = useState([
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 19),
  ]);

  const data = [
    {
      label: formatDate(new Date(2015, 0, 1)),
      values: [
        10 * randomNumbers[0],
        1 * randomNumbers[1],
        // 8 * randomNumbers[2],
      ],
    },
    {
      label: formatDate(new Date(2015, 1, 1)),
      values: [
        16 * randomNumbers[2],
        14 * randomNumbers[1],
        // 10 * randomNumbers[0],
      ],
    },
    {
      label: formatDate(new Date(2015, 2, 1)),
      values: [
        6 * randomNumbers[0],
        9 * randomNumbers[1],
        // 3 * randomNumbers[2],
      ],
    },
    {
      label: formatDate(new Date(2015, 3, 1)),
      values: [
        3 * randomNumbers[2],
        4 * randomNumbers[0],
        // 8 * randomNumbers[1],
      ],
    },
    {
      label: formatDate(new Date(2015, 4, 1)),
      values: [
        5 * randomNumbers[0],
        40 * randomNumbers[2],
        // 10 * randomNumbers[1],
      ],
    },
    {
      label: formatDate(new Date(2015, 0, 1)),
      values: [
        10 * randomNumbers[0],
        1.9 * randomNumbers[1],
        // 8 * randomNumbers[2],
      ],
    },
  ];

  return (
    <div
      style={{
        margin: '150px 0',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: 'auto',
          background: 'white',
          padding: 12,
          borderRadius: 6,
          border: `1px solid ${colorSky}`,
        }}
      >
        <AreaChart
          formatYAxisValue={formatNumber}
          chartHeight={500}
          xAxisLabels={[
            'Day 1',
            'Day 2',
            'Day 3',
            'Day 4',
            'Day 5',
            'Day 6',
            'Day 7',
          ]}
          series={[
            {
              name: 'Asia',
              data: [502, 1000, 2000, 1000, 100, 1000, 5000],
              color: 'colorPurple',
            },
            {
              name: 'Africa',
              data: [106, 107, 111, 133, 100, 767, 1766],
              color: 'colorInk',
            },
            {
              name: 'Europe',
              data: [163, 203, 276, 408, 547, 729, 1028],
              color: 'colorGreen',
            },
            {
              name: 'America',
              data: [180, 310, 540, 156, 339, 818, 1201],
              color: 'colorOrange',
            },
            {
              name: 'Ocenia',
              data: [200, 200, 200, 600, 10000, 300, 460],
              color: 'colorRed',
            },
          ]}
        />

        <div style={{textAlign: 'left'}}>
          <button
            style={{
              border: `2px solid ${colorBlue}`,
              fontSize: 13,
              borderRadius: 8,
              color: colorBlue,
              padding: '7px 18px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
            onClick={() =>
              setRandomNumbers([
                Math.round(Math.random() * 10),
                Math.round(Math.random() * 10),
                Math.round(Math.random() * 19),
              ])
            }
          >
            Change data set
          </button>
        </div>
      </div>
    </div>
  );
}
