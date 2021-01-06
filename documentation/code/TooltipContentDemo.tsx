import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {
  TooltipContent,
  TooltipContentProps,
  BarChartTooltipContent,
  LineChartTooltipContent,
  LineChartTooltipContentProps,
} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

function TooltipContainer({
  children,
  title,
  width,
}: {
  children: React.ReactNode;
  title: string;
  width: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        alignItems: 'center',
      }}
    >
      <span style={{marginBottom: '10px'}}>{title}</span>

      <div
        style={{
          display: 'inline-block',
          background: 'white',
          border: '1px solid #c4cdd5',
          borderRadius: '4px',
          padding: '8px',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function TooltipContentDemo() {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };

  const tooltipContentData: TooltipContentProps['data'] = [
    {
      color: 'primary',
      label: 'Hot dogs',
      value: '10',
    },
    {
      color: 'secondary',
      label: 'Hamburgers',
      value: '14',
    },

    {
      color: 'tertiary',
      label: 'Fries',
      value: '21',
    },
  ];

  const lineChartTooltipContentData: LineChartTooltipContentProps['data'] = [
    {
      name: 'Hot Dogs',
      point: {
        label: 'January 1st, 2021',
        value: '10',
      },
      style: {
        color: 'primary',
        lineStyle: 'solid',
      },
    },
    {
      name: 'Hot Dogs',
      point: {
        label: 'December 1st, 2020',
        value: '12',
      },
      style: {
        color: 'pastComparison',
        lineStyle: 'dashed',
      },
    },
  ];

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <TooltipContainer title="TooltipContent" width="150px">
          <TooltipContent
            title="January 1st, 2021"
            data={tooltipContentData}
            total={{
              label: 'Total',
              value: '45',
            }}
          />
        </TooltipContainer>

        <TooltipContainer title="LineChartTooltipContent" width="240px">
          <LineChartTooltipContent data={lineChartTooltipContentData} />
        </TooltipContainer>

        <TooltipContainer title="BarChartTooltipContent" width="180px">
          <BarChartTooltipContent label="January 1st, 2021" value="10" />
        </TooltipContainer>
      </div>
    </div>
  );
}
