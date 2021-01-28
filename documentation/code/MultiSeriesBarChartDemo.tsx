import React from 'react';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  MultiSeriesBarChart,
  MultiSeriesBarChartProps,
  TooltipContent,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

interface Props {
  isStacked?: boolean;
}

export function MultiSeriesBarChartDemo({isStacked = false}: Props) {
  const innerContainerStyle = {
    width: '900px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const series = [
    {
      color: 'primary',
      highlightColor: 'primaryProminent',
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
      color: 'secondary',
      highlightColor: 'secondaryProminent',
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
      color: 'tertiary',
      highlightColor: 'tertiaryProminent',
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
      maximumSignificantDigits: 3,
    }).format(val);

  const renderTooltipContent: MultiSeriesBarChartProps['renderTooltipContent'] = ({
    data,
    title,
  }) => {
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
          formatYAxisLabel={formatYAxisLabel}
          labels={labels}
          series={series}
          chartHeight={253}
          isStacked={isStacked}
          renderTooltipContent={renderTooltipContent}
        />
      </div>
    </div>
  );
}
