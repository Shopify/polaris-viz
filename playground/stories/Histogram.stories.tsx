import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../src/components';
import {
  chartColors,
  backgroundColor,
  axisColor,
  textColor,
  crossHairColor,
} from './constants';

document.body.style.fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

export default {
  title: 'Playground/Histogram',
  component: BarChart,
  parameters: {
    options: {
      showPanel: false,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {name: 'dark', value: backgroundColor},
        // {name: 'light', value: 'white'},
      ],
    },
  },
  decorators: [
    (Story: any) => (
      <div
        style={{
          width: '600px',
          height: '250px',
          background: backgroundColor,
          padding: '20px',
          marginTop: '5px',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <BarChart
      isAnimated
      data={args.data}
      color={chartColors.blueWhiteGradient}
      skipLinkText="Skip chart content"
      timeSeries
      axisColor={axisColor}
      textColor={textColor}
      crossHairColor={crossHairColor}
      hasRoundedCorners
      leftAlignLabels
      useHardCodedGradient
      background={backgroundColor}
    />
  );
};

const chartData = [
  {
    rawValue: 10.154471869354719,
    label: '0',
  },
  {
    rawValue: 45.996319948781284,
    label: '1',
  },
  {
    rawValue: 16.587832862892647,
    label: '2',
  },
  {
    rawValue: 9.6549163769236532,
    label: '3',
    annotation: 'Median: 3.5',
  },
  {
    rawValue: 32.83315300207698,
    label: '4',
  },
  {
    rawValue: 85.59694953733555,
    label: '5',
  },
  {
    rawValue: 74.31675425853265,
    label: '6',
  },
  {
    rawValue: 91.56764219680792,
    label: '7',
  },
  {
    rawValue: 58.01201763880841,
    label: '8',
  },
  {
    rawValue: 40.92917545574713,
    label: '9',
  },
  {
    rawValue: 58.544724136704396,
    label: '10',
  },
  {
    rawValue: 64.58976679740891,
    label: '11',
  },
  {
    rawValue: 9.322668954699687,
    label: '12',
  },
  {
    rawValue: 26.57654241435403,
    label: '13',
  },
  {
    rawValue: 34.2578055525538,
    label: '14',
  },
  {
    rawValue: 50.169629782092095,
    label: '15',
  },
  {
    rawValue: 56.51483868457661,
    label: '16',
  },
  {
    rawValue: 85.85622063984066,
    label: '17',
  },
  {
    rawValue: 2.6429450901744644,
    label: '18',
  },
  {
    rawValue: 12.476274510608242,
    label: '19 +',
  },
];

export const Default = Template.bind({});
Default.args = {
  data: chartData,
};
