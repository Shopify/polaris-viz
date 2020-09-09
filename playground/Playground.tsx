import React, {useState} from 'react';
import {colorSky, colorSkyDark, colorBlue} from '@shopify/polaris-tokens';

import {AreaChart} from '../src/components';

function random() {
  const num = Math.round(Math.random() * 100) + 5;
  return num;
}

const formatDate = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
}).format;

const formatNumber = new Intl.NumberFormat('en').format;

const data = [
  {
    x: formatDate(new Date(2015, 0, 1)),
    values: [1000 * random(), 1920 * random(), 800 * random()],
  },
  {
    x: formatDate(new Date(2015, 1, 1)),
    values: [1600 * random(), 1440 * random(), 100 * random()],
  },
  {
    x: formatDate(new Date(2015, 2, 1)),
    values: [640 * random(), 960 * random(), 310 * random()],
  },
  {
    x: formatDate(new Date(2015, 3, 1)),
    values: [3820 * random(), 480 * random(), 880 * random()],
  },
  {
    x: formatDate(new Date(2015, 4, 1)),
    values: [5320 * random(), 480 * random(), 100 * random()],
  },
];

export default function Playground() {
  const [dataSet, setDataSet] = useState(data);

  function handleChangeDataSet() {
    setDataSet([
      {
        x: formatDate(new Date(2015, 0, 1)),
        values: [1000 * random(), 1920 * random(), 800 * random()],
      },
      {
        x: formatDate(new Date(2015, 1, 1)),
        values: [1600 * random(), 1440 * random(), 100 * random()],
      },
      {
        x: formatDate(new Date(2015, 2, 1)),
        values: [640 * random(), 960 * random(), 310 * random()],
      },
      {
        x: formatDate(new Date(2015, 3, 1)),
        values: [3820 * random(), 480 * random(), 880 * random()],
      },
      {
        x: formatDate(new Date(2015, 4, 1)),
        values: [5320 * random(), 480 * random(), 100 * random()],
      },
    ]);
  }

  const dataCategories = ['Online store', 'POS', 'Facebook'];

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
          data={dataSet}
          dataCategories={dataCategories}
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
            onClick={() => handleChangeDataSet()}
          >
            Change data set
          </button>
        </div>
      </div>
    </div>
  );
}
