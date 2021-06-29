import React from 'react';

import {
  StackedAreaChart,
  StackedAreaChartProps,
  TooltipContent,
  Legend,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function StackedAreaChartDemo() {
  const innerContainerStyle = {
    width: '100%',
    height: '300px',
    marginBottom: '20px',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series = [
    {
      name: 'First-time',
      data: [
        {label: 'January', rawValue: 4237},
        {label: 'February', rawValue: 5024},
        {label: 'March', rawValue: 5730},
        {label: 'April', rawValue: 5587},
        {label: 'May', rawValue: 5303},
        {label: 'June', rawValue: 5634},
        {label: 'July', rawValue: 3238},
      ],
      color: 'rgb(0,161,159)',
    },
    {
      name: 'Returning',
      data: [
        {label: 'January', rawValue: 5663},
        {label: 'February', rawValue: 7349},
        {label: 'March', rawValue: 9795},
        {label: 'April', rawValue: 7396},
        {label: 'May', rawValue: 7028},
        {label: 'June', rawValue: 12484},
        {label: 'July', rawValue: 4878},
      ],
      color: 'rgb(41,35,112)',
    },
  ];

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const formatYAxisLabel = (value?: number) => {
    const formatter = new Intl.NumberFormat('en').format;
    if (value == null) {
      return '-';
    }

    return formatter(value);
  };

  const renderTooltipContent: StackedAreaChartProps['renderTooltipContent'] = ({
    data,
    title,
  }) => {
    const formatTooltipValue = (val: number) =>
      new Intl.NumberFormat('en').format(val);

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
        <StackedAreaChart
          series={series}
          skipLinkText="Skip chart content"
          xAxisLabels={labels}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={renderTooltipContent}
        />
      </div>
      <Legend series={series} />
    </div>
  );
}
