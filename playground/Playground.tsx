// import React from 'react';

// import {BarChart} from '../src/components';

// export default function Playground() {
//   return (
//     <div style={{height: '400px', width: '800px', maxWidth: '100%'}}>
//       <BarChart
//         data={[
//           {rawValue: 10, formattedValue: '10', label: 'Apples'},
//           {rawValue: 5, formattedValue: '5', label: 'Peaches'},
//           {rawValue: -20, formattedValue: '-20', label: 'Strawberries'},
//           {rawValue: 20, formattedValue: '20', label: 'Strawberries'},
//           {rawValue: 25, formattedValue: '25', label: 'Strawberries'},
//           {rawValue: 60, formattedValue: '60', label: 'Strawberries'},
//           {rawValue: 1, formattedValue: '1', label: 'Strawberries'},
//           {rawValue: -20, formattedValue: '-20', label: 'Strawberries'},
//           {rawValue: 1, formattedValue: '1', label: 'Strawberries'},
//         ]}
//       />
//     </div>
//   );
// }

import React, {useState} from 'react';
import {colorSky, colorSkyDark, colorBlue} from '@shopify/polaris-tokens';

import {LineChart, BarChart} from '../src/components';

const formatMoney = new Intl.NumberFormat('en', {
  currency: 'USD',
  style: 'currency',
}).format;
const formatNumber = new Intl.NumberFormat('en').format;
const formatDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
}).format;

function generateData(numPoints, min = 5, max = 15) {
  return Array.from(Array(numPoints))
    .fill(null)
    .map((_, index) => {
      return {x: `${index}`, y: min + Math.floor(Math.random() * max)};
    });
}

const OVERVIEW_DASHBOARD_STYLE = [
  {
    name: 'Apr–Apr 30, 2020 was a good month',
    data: generateData(30, 0, 2000000),
  },
  {
    name: 'Mar 1–Mar 31, 2020',
    data: generateData(31, 0, 2000000),
    style: {
      color: 'colorSkyDark',
      lineStyle: 'dashed',
    },
  },
];

const LOTS_OF_DATA = [
  {
    data: [
      {x: '5', y: 100},
      {x: '6', y: -40},
      {x: '7', y: -20},
      {x: '8', y: -40},
      {x: '9', y: 250},
      {x: '10', y: 100},
      {x: '11', y: 100},
      {x: '12', y: -40},
      {x: '13', y: -20},
      {x: '14', y: -40},
      {x: '15', y: 250},
      {x: '16', y: 100},
    ],
    name: 'Data 1',
    style: {color: 'colorTeal'},
  },
  {
    data: generateData(8, 0, 1000),
    name: 'Data 2',
    style: {lineStyle: 'dashed'},
  },
  {
    data: generateData(10, 0, 1000),
    name: 'Data 3',
    style: {color: 'colorBlue'},
  },
  {
    data: generateData(8, 0, 1000),
    name: 'Data 4',
    style: {color: 'colorOrange', lineStyle: 'dashed'},
  },
];

export default function Playground() {
  const [dataSet, setDataSet] = useState('OVERVIEW_DASHBOARD');

  const series =
    dataSet === 'OVERVIEW_DASHBOARD' ? OVERVIEW_DASHBOARD_STYLE : LOTS_OF_DATA;

  function handleChangeDataSet() {
    setDataSet(
      dataSet === 'OVERVIEW_DASHBOARD' ? 'LOTS_OF_DATA' : 'OVERVIEW_DASHBOARD',
    );
  }

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

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
        <BarChart
          formatValue={(val) => `$${val}`}
          highlightColor="colorPurpleDark"
          data={[
            {rawValue: 100, label: 'Apples'},
            {rawValue: 5, label: 'Peaches'},
            {rawValue: -20, label: 'Strawberries'},
            {
              rawValue: 20,
              label: 'Strawberries that have a super long name for some reason',
            },
            {rawValue: 25, label: 'Strawberries'},
            {rawValue: 60, label: 'Strawberries'},
            {rawValue: 1, label: 'Strawberries'},
            {rawValue: -20, label: 'Strawberries'},
            {rawValue: 1, label: 'Strawberries'},
          ]}
        />
        {/* <LineChart
          xAxisLabels={series[0].data.map(({x}) =>
            formatDate(new Date(2020, 3, parseInt(x, 10) + 1)),
          )}
          formatYAxisValue={formatNumber}
          series={series}
        />

        <br />
        <hr style={{border: 0, height: 1, background: colorSkyDark}} />
        <br />

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
        </div> */}
      </div>
    </div>
  );
}
