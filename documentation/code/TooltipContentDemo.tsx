import React from 'react';

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
    width: '100%',
    height: '300px',
    background: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap' as 'wrap',
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
      color: 'primary',
      lineStyle: 'solid',
    },
    {
      name: 'Hot Dogs2',
      point: {
        label: 'December 1st, 2020',
        value: '12',
      },
      color: 'pastComparison',
      lineStyle: 'dashed',
    },
    {
      name: 'Hot Dogs3',
      point: {
        label: 'November 1st, 2020',
        value: '12',
      },
      color: 'secondary',
      lineStyle: 'dotted',
    },
  ];

  const barChartAnnotation = {
    dataIndex: 1,
    width: 5,
    color: '#ccc',
    tooltipData: {
      label: 'Median ',
      value: '10',
    },
  };

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
          <BarChartTooltipContent
            label="January 1st, 2021"
            value="10"
            annotation={barChartAnnotation}
          />
        </TooltipContainer>
      </div>
    </div>
  );
}
