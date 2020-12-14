import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
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
      label: 'Breakfast',
      data: [3, 7, 4, 8, 10, 0, 1],
    },
    {
      color: 'secondary',
      highlightColor: 'secondaryProminent',
      label: 'Lunch',
      data: [4, 3, 5, 15, 8, 10, 2],
    },
    {
      color: 'tertiary',
      highlightColor: 'tertiaryProminent',
      label: 'Dinner',
      data: [7, 2, 6, 12, 10, 5, 3],
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
