import {useState} from 'react';

import {LineChartPredictive} from '../../LineChartPredictive';
import type {DataSeries} from '@shopify/polaris-viz-core';

export {META as default} from '../meta';

// const DATA: DataSeries[] = [
//   {
//     name: 'January 2023-December 2023',
//     data: [
//       {
//         key: 0,
//         value: 70,
//       },
//       {
//         key: 1,
//         value: 80,
//       },
//       {
//         key: 2,
//         value: 87,
//       },
//       {
//         value: null,
//         key: 3,
//       },
//       {
//         value: null,
//         key: 4,
//       },
//       {
//         value: null,
//         key: 5,
//       },
//       {
//         value: null,
//         key: 6,
//       },
//       {
//         value: null,
//         key: 7,
//       },
//       {
//         value: null,
//         key: 8,
//       },
//       {
//         value: null,
//         key: 9,
//       },
//       {
//         value: null,
//         key: 10,
//       },
//       {
//         value: null,
//         key: 11,
//       },
//     ],
//     styleOverride: {
//       line: {
//         hasArea: false,
//       },
//     },
//   },
//   {
//     name: 'January 2023-December 2023',
//     data: [
//       {
//         value: null,
//         key: 0,
//       },
//       {
//         value: null,
//         key: 1,
//       },
//       {
//         key: 2,
//         value: 87,
//       },
//       {
//         key: 3,
//         value: 93,
//       },
//       {
//         key: 4,
//         value: 96,
//       },
//       {
//         key: 5,
//         value: 102,
//       },
//       {
//         key: 6,
//         value: 104,
//       },
//       {
//         key: 7,
//         value: 105,
//       },
//       {
//         key: 8,
//         value: 106,
//       },
//       {
//         key: 9,
//         value: 107,
//       },
//       {
//         key: 10,
//         value: 108,
//       },
//       {
//         key: 11,
//         value: 109,
//       },
//     ],
//     styleOverride: {
//       line: {
//         strokeDasharray: '1 10 1',
//         hasArea: false,
//       },
//     },
//     metadata: {
//       relatedIndex: 0,
//       isPredictive: true,
//       startKey: 2,
//     },
//   },
//   {
//     data: [
//       {
//         key: 0,
//         value: 70,
//       },
//       {
//         key: 1,
//         value: 57,
//       },
//       {
//         key: 2,
//         value: 62,
//       },
//       {
//         key: 3,
//         value: 67,
//       },
//       {
//         key: 4,
//         value: 69,
//       },
//       {
//         key: 5,
//         value: 72,
//       },
//       {
//         key: 6,
//         value: 73,
//       },
//       {
//         key: 7,
//         value: 75,
//       },
//       {
//         key: 8,
//         value: 77,
//       },
//       {
//         key: 9,
//         value: 78,
//       },
//       {
//         key: 10,
//         value: 79,
//       },
//       {
//         key: 11,
//         value: 81,
//       },
//     ],
//     isComparison: true,
//     name: 'January 2022-December 2022',
//   },
// ];

const DATA: DataSeries[] = [
  {
    name: 'January 2023-December 2023',
    data: [
      {
        key: 0,
        value: 70,
      },
      {
        key: 1,
        value: 80,
      },
      {
        key: 2,
        value: 87,
      },
      {
        value: null,
        key: 3,
      },
      {
        value: null,
        key: 4,
      },
      {
        value: null,
        key: 5,
      },
    ],
    styleOverride: {
      line: {
        hasArea: false,
      },
    },
  },
  {
    name: 'January 2023-December 2023',
    data: [
      {
        value: null,
        key: 0,
      },
      {
        value: null,
        key: 1,
      },
      {
        key: 2,
        value: 87,
      },
      {
        key: 3,
        value: 93,
      },
      {
        key: 4,
        value: 96,
      },
      {
        key: 5,
        value: 102,
      },
    ],
    styleOverride: {
      line: {
        strokeDasharray: '1 10 1',
        hasArea: false,
      },
    },
    metadata: {
      relatedIndex: 0,
      isPredictive: true,
      startKey: 2,
    },
  },
  //
  {
    name: 'Aug 2023-December 2023',
    data: [
      {
        key: 0,
        value: 170,
      },
      {
        key: 1,
        value: 180,
      },
      {
        key: 2,
        value: 187,
      },
      {
        value: null,
        key: 3,
      },
      {
        value: null,
        key: 4,
      },
      {
        value: null,
        key: 5,
      },
    ],
    styleOverride: {
      line: {
        hasArea: false,
      },
    },
  },
  {
    name: 'Aug 2023-December 2023',
    data: [
      {
        value: null,
        key: 0,
      },
      {
        value: null,
        key: 1,
      },
      {
        key: 2,
        value: 187,
      },
      {
        key: 3,
        value: 193,
      },
      {
        key: 4,
        value: 196,
      },
      {
        key: 5,
        value: 1102,
      },
    ],
    styleOverride: {
      line: {
        strokeDasharray: '1 10 1',
        hasArea: false,
      },
    },
    metadata: {
      relatedIndex: 2,
      isPredictive: true,
      startKey: 2,
    },
  },
  //
  {
    data: [
      {
        key: 0,
        value: 70,
      },
      {
        key: 1,
        value: 57,
      },
      {
        key: 2,
        value: 62,
      },
      {
        key: 3,
        value: 67,
      },
      {
        key: 4,
        value: 69,
      },
      {
        key: 5,
        value: 72,
      },
    ],
    isComparison: true,
    name: 'January 2022-December 2022',
  },
];

export const DynamicData = () => {
  // const [data, setData] = useState([
  //   {
  //     name: 'BCFM 2019',
  //     data: [
  //       {
  //         key: 'Womens Leggings',
  //         value: 3,
  //       },
  //       {
  //         key: 'Mens Bottoms',
  //         value: 7,
  //       },
  //       {
  //         key: 'Mens Shorts',
  //         value: 4,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'BCFM 2020',
  //     data: [
  //       {
  //         key: 'Womens Leggings',
  //         value: 1,
  //       },
  //       {
  //         key: 'Mens Bottoms',
  //         value: 2,
  //       },
  //       {
  //         key: 'Mens Shorts',
  //         value: 5,
  //       },
  //     ],
  //   },
  // ]);

  // const onClick = () => {
  //   const newData = data.map((series) => {
  //     return {
  //       ...series,
  //       data: series.data.map(({key}) => {
  //         const newValue = Math.floor(Math.random() * 200);
  //         return {
  //           key,
  //           value: newValue,
  //         };
  //       }),
  //     };
  //   });

  //   setData(newData);
  // };

  return (
    <>
      <div style={{height: 400, width: 800}}>
        <LineChartPredictive data={DATA} />
      </div>
      {/* <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
        onClick={onClick}
      >
        Change Data
      </button> */}
    </>
  );
};
