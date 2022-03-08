import type {DataSeries} from '@shopify/polaris-viz-core';

// Take a DataSeries and format it into
// visual groups used for the chart.
//
// Input: {
//   name: 'BCFM 2019',
//   data: [
//     {
//       key: 'Shirts',
//       value: 5,
//     },
//     {
//       key: 'Shoes',
//       value: 10,
//     },
//   ],
// },
// {
//   name: 'BCFM 2020',
//   data: [
//     {
//       key: 'Shirts',
//       value: 15,
//     },
//     {
//       key: 'Shoes',
//       value: 20,
//     },
//   ],
// },
//
// Output: [[5, 15], [10, 20]]

export function formatDataIntoGroups(data: DataSeries[]) {
  const groups: number[][] = [];

  data.forEach(({data: dataPoints}) => {
    dataPoints.forEach(({value}, dataIndex) => {
      if (value == null) {
        return;
      }

      if (!groups[dataIndex]) {
        groups[dataIndex] = [value];
      } else {
        groups[dataIndex].push(value);
      }
    });
  });

  return groups;
}
