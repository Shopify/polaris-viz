import React, {useState} from 'react';
import {colorSky, colorSkyDark, colorBlue} from '@shopify/polaris-tokens';

import {AreaChart} from '../src/components';

const formatNumber = new Intl.NumberFormat('en').format;
const formatDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
}).format;

const geoData = [
  {
    name: 'Asia',
    data: [502, 1000, 2000, 1000, 100, 1000, 5000],
    color: 'colorPurple',
  },
  {
    name: 'Africa',
    data: [106, 107, 111, 133, 100, 767, 1766],
    color: 'colorTeal',
  },
  {
    name: 'Europe',
    data: [163, 203, 276, 408, 547, 729, 1028],
    color: 'colorGreen',
  },
  {
    name: 'America',
    data: [180, 310, 540, 156, 339, 818, 1201],
    color: 'colorIndigo',
  },
  {
    name: 'Ocenia',
    data: [200, 200, 200, 600, 10000, 300, 460],
    color: 'colorBlue',
  },
];

export default function Playground() {
  const [data, setData] = useState(geoData);

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
          xAxisLabels={data[3].data.map((_, i) => `Day ${i + 1}`)}
          series={data}
          totalMessage="Total"
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
            onClick={() => {
              setData([
                {
                  name: 'Asia',
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    // Math.random() * 100,
                  ],
                  color: 'colorPurple',
                },
                {
                  name: 'Africa',
                  data: [
                    Math.random() * 100,

                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    // Math.random() * 100,
                  ],
                  color: 'colorTeal',
                },
                {
                  name: 'Europe',
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: 'colorGreen',
                },
                {
                  name: 'America',
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: 'colorIndigo',
                },
                {
                  name: 'Ocenia',
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: 'colorBlue',
                },
              ]);
            }}
          >
            Change data set
          </button>
        </div>
      </div>
    </div>
  );
}
