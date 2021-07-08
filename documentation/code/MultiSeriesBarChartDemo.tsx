import React from 'react';

import {
  MultiSeriesBarChart,
  MultiSeriesBarChartProps,
  TooltipContent,
  Legend,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

interface Props {
  isStacked?: boolean;
}

export function MultiSeriesBarChartDemo({isStacked = false}: Props) {
  const innerContainerStyle = {
    width: '100%',
    height: '400px',
    marginBottom: '20px',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series = [
    {
      color: 'rgb(0,161,159)',
      highlightColor: 'rgb(0, 106, 104)',
      name: 'Breakfast',
      data: [
        {label: 'Monday', rawValue: 3},
        {label: 'Tuesday', rawValue: 7},
        {label: 'Wednesday', rawValue: 4},
        {label: 'Thursday', rawValue: 8},
        {label: 'Friday', rawValue: 10},
        {label: 'Saturday', rawValue: 0},
        {label: 'Sunday', rawValue: 1},
      ],
    },
    {
      color: 'rgb(41,35,112)',
      highlightColor: 'rgb(9, 6, 37)',
      name: 'Lunch',
      data: [
        {label: 'Monday', rawValue: 4},
        {label: 'Tuesday', rawValue: 3},
        {label: 'Wednesday', rawValue: 5},
        {label: 'Thursday', rawValue: 15},
        {label: 'Friday', rawValue: 8},
        {label: 'Saturday', rawValue: 10},
        {label: 'Sunday', rawValue: 2},
      ],
    },
    {
      color: 'rgb(13,140,237)',
      highlightColor: 'rgb(6, 96, 166)',
      name: 'Dinner',
      data: [
        {label: 'Monday', rawValue: 7},
        {label: 'Tuesday', rawValue: 2},
        {label: 'Wednesday', rawValue: 6},
        {label: 'Thursday', rawValue: 12},
        {label: 'Friday', rawValue: 10},
        {label: 'Saturday', rawValue: 5},
        {label: 'Sunday', rawValue: 3},
      ],
    },
  ];

  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const formatYAxisLabel = (val: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(val);

  const renderTooltipContent: MultiSeriesBarChartProps['renderTooltipContent'] =
    ({data, title}) => {
      const formatTooltipValue = (val: number) =>
        new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(val);

      const formattedData = data.map(({label, value, color}) => ({
        color,
        label,
        value: formatTooltipValue(value),
      }));

      const total = data.reduce((totalValue, {value}) => totalValue + value, 0);

      return (
        <TooltipContent
          title={title}
          data={formattedData}
          total={{label: 'Total', value: formatTooltipValue(total)}}
        />
      );
    };

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <MultiSeriesBarChart
          yAxisOptions={{labelFormatter: formatYAxisLabel}}
          xAxisOptions={{labels}}
          series={series}
          barOptions={{isStacked}}
          renderTooltipContent={renderTooltipContent}
          skipLinkText="Skip chart content"
        />
      </div>

      <Legend series={series} />
    </div>
  );
}
