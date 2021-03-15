import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
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
      color: 'primary' as 'primary',
      highlightColor: 'primaryProminent' as 'primaryProminent',
      name: 'Breakfast',
      data: [
        {label: 'Monday', rawValue: 0.3},
        {label: 'Tuesday', rawValue: 0.99997},
        {label: 'Wednesday', rawValue: 0.4},
        {label: 'Thursday', rawValue: 0.8},
        {label: 'Friday', rawValue: 0.234234234},
        {label: 'Saturday', rawValue: 0.0},
        {label: 'Sunday', rawValue: 0.1},
      ],
    },
    {
      color: 'secondary' as 'secondary',
      highlightColor: 'secondaryProminent' as 'secondaryProminent',
      name: 'Lunch',
      data: [
        {label: 'Monday', rawValue: 0.4},
        {label: 'Tuesday', rawValue: 0.3},
        {label: 'Wednesday', rawValue: 0.5},
        {label: 'Thursday', rawValue: 0.15},
        {label: 'Friday', rawValue: 0.8},
        {label: 'Saturday', rawValue: 0.1},
        {label: 'Sunday', rawValue: 0.2},
      ],
    },
    {
      color: 'tertiary' as 'tertiary',
      highlightColor: 'tertiaryProminent' as 'tertiaryProminent',
      name: 'Dinner',
      data: [
        {label: 'Monday', rawValue: 0.7},
        {label: 'Tuesday', rawValue: 0.2},
        {label: 'Wednesday', rawValue: 0.6},
        {label: 'Thursday', rawValue: 0.12},
        {label: 'Friday', rawValue: 0.1},
        {label: 'Saturday', rawValue: 0.5},
        {label: 'Sunday', rawValue: 0.3},
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
          // formatYAxisLabel={formatYAxisLabel}
          labels={labels}
          series={series}
          isStacked={isStacked}
          renderTooltipContent={renderTooltipContent}
        />
      </div>

      <Legend series={series} />
    </div>
  );
}
