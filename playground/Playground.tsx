// import React from 'react';
// import {condenseCurrency} from '@shopify/condense-number';

// import {LineChart} from '../src/components';

// export default function Playground() {
//   document.body.style.fontFamily =
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

//   const formatXAxisLabel = (value: string) => {
//     const date = new Date(value);
//     return date.toLocaleDateString('en-CA', {day: 'numeric', month: 'numeric'});
//   };

//   const formatY = new Intl.NumberFormat('en', {
//     style: 'currency',
//     currency: 'CAD',
//   }).format;

//   const formatYAxisLabel = (value) =>
//     condenseCurrency(value, 'en', 'USD', {maxPrecision: 1});

//   const series = [
//     {
//       name: 'Nov. 20–Dec. 3 2020',
//       data: [
//         {rawValue: 85206.54, label: 'November 20, 2020'},
//         {rawValue: 113059.6, label: 'November 21, 2020'},
//         {rawValue: 166243.54, label: 'November 22, 2020'},
//         {rawValue: 144078.52, label: 'November 23, 2020'},
//         {rawValue: 153029.72, label: 'November 24, 2020'},
//         {rawValue: 208592.43, label: 'November 25, 2020'},
//         {rawValue: 249388.35, label: 'November 26, 2020'},
//         {rawValue: 514304.53, label: 'November 27, 2020', annotate: true},
//         {rawValue: 299482.38, label: 'November 28, 2020'},
//         {rawValue: 168596.98, label: 'November 29, 2020', prediction: true},
//         {rawValue: 211383.88, label: 'November 30, 2020', prediction: true},
//         {rawValue: 38516.11, label: 'December 1, 2020', prediction: true},
//         {rawValue: 17544.46, label: 'December 2, 2020', prediction: true},
//         {rawValue: 24695.45, label: 'December 3, 2020', prediction: true},
//       ],
//       style: {
//         color: 'url(#gradient)',
//       },
//       formatY,
//     },
//     // {
//     //   name: 'Oct. 10-Oct. 23, 2020',
//     //   data: [
//     //     {rawValue: 141628.76, label: 'October 10, 2020'},
//     //     {rawValue: 213781.63, label: 'October 11, 2020'},
//     //     {rawValue: 156986.49, label: 'October 12, 2020'},
//     //     {rawValue: 140158.67, label: 'October 13, 2020'},
//     //     {rawValue: 154246.02, label: 'October 14, 2020'},
//     //     {rawValue: 81105.73, label: 'October 15, 2020'},
//     //     {rawValue: 42369.96, label: 'October 16, 2020'},
//     //     {rawValue: 57114.48, label: 'October 17, 2020'},
//     //     {rawValue: 60234.92, label: 'October 18, 2020'},
//     //     {rawValue: 53804.3, label: 'October 19, 2020'},
//     //     {rawValue: 41893.46, label: 'October 20, 2020'},
//     //     {rawValue: 34402.5, label: 'October 21, 2020'},
//     //     {rawValue: 22154.64, label: 'October 22, 2020'},
//     //     {rawValue: 29981.13, label: 'October 23, 2020'},
//     //   ],
//     //   style: {
//     //     color: 'url(#gradient)',
//     //   },
//     //   formatY,
//     // },
//   ];

//   const xAxisLabels = series[0].data.map(({label}) => label);

//   return (
//     <div
//       style={{
//         width: '900px',
//         background: 'white',
//         padding: '2rem',
//         borderRadius: '6px',
//         // border: '1px solid #EAECEF',
//       }}
//     >
//       <LineChart
//         chartHeight={229}
//         xAxisLabels={xAxisLabels}
//         formatXAxisLabel={formatXAxisLabel}
//         formatYAxisLabel={formatYAxisLabel}
//         series={series}
//       />
//     </div>
//   );
// }

import React from 'react';

import {StackedAreaChart} from '../src/components';

export default function Playground() {
  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const formatXAxisLabel = (value: string) => `${value}`;

  const formatYAxisLabel = (value?: number) => {
    const formatter = new Intl.NumberFormat('en').format;
    if (value == null) {
      return '-';
    }

    return formatter(value);
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <>
      <div style={innerContainerStyle}>
        <p>3648061509</p>
        <StackedAreaChart
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={[
            'All sessions',
            'Added to chart',
            'Reached checkout',
            'Converted',
          ]}
          series={[
            {
              label: 'Last 28 days',
              // total_sessions, total_carts, total_reached_checkouts,
              data: [17625684, 957398, 5, 0],
              color: 'url(#gradient)',
            },
          ]}
        />
      </div>

      <div style={innerContainerStyle}>
        <p>27285192778</p>
        <StackedAreaChart
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={[
            'All sessions',
            'Added to chart',
            'Reached checkout',
            'Converted',
          ]}
          series={[
            {
              label: 'Last 28 days',
              // total_sessions, total_carts, total_reached_checkouts,
              data: [893, 10, 4, 3],
              color: 'url(#gradient)',
            },
          ]}
        />
      </div>

      <div style={innerContainerStyle}>
        <p>23215947</p>
        <StackedAreaChart
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={[
            'All sessions',
            'Added to chart',
            'Reached checkout',
            'Converted',
          ]}
          series={[
            {
              label: 'Last 28 days',
              // total_sessions, total_carts, total_reached_checkouts,
              data: [4027305, 261785, 157580, 109252],
              color: 'url(#gradient)',
            },
          ]}
        />
      </div>
    </>
  );
}
