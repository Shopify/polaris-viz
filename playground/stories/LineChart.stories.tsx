import React from 'react';
import {Story, Meta} from '@storybook/react';
import {condenseNumber} from '@shopify/condense-number';

import {LineChart, LineChartProps} from '../../src/components';
import {
  backgroundColors,
  axisColors,
  textColors,
  crossHairColors,
  fontFamily,
  containerStyles,
} from './constants.stories';

document.body.style.fontFamily = fontFamily;
export default {
  title: 'Playground/LineChart',
  component: LineChart,
  parameters: {
    options: {
      showPanel: false,
    },
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: backgroundColors.light},
        {name: 'dark', value: backgroundColors.dark},
      ],
    },
  },
  decorators: [
    (Story: any, context) => {
      return <div style={containerStyles}>{Story()}</div>;
    },
  ],
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <LineChart
      isAnimated
      axisColor={args.axisColor}
      textColor={args.textColor}
      crossHairColor={args.crossHairColor}
      series={args.data}
      xAxisLabels={[
        '2020-04-01T12:00:00',
        '2020-04-02T12:00:00',
        '2020-04-03T12:00:00',
        '2020-04-04T12:00:00',
        '2020-04-05T12:00:00',
        '2020-04-06T12:00:00',
        '2020-04-07T12:00:00',
        '2020-04-08T12:00:00',
        '2020-04-09T12:00:00',
        '2020-04-10T12:00:00',
        '2020-04-11T12:00:00',
        '2020-04-12T12:00:00',
        '2020-04-13T12:00:00',
        '2020-04-14T12:00:00',
      ]}
      formatXAxisLabel={(value) =>
        new Date(value).toLocaleDateString('en-CA', {
          day: 'numeric',
          month: 'numeric',
        })
      }
      formatYAxisLabel={(value) => condenseNumber(value, 'en')}
      skipLinkText="Skip line chart content"
      hasSpline
      lineWidth={3}
      useGradientLine
    />
  );
};

const chartData = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 2251, label: '2020-04-01T12:00:00'},
      {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
      {rawValue: 5000, label: '2020-04-03T12:00:00'},
      {rawValue: 7200, label: '2020-04-04T12:00:00'},
      {rawValue: 1500, label: '2020-04-05T12:00:00'},
      {rawValue: 6132, label: '2020-04-06T12:00:00'},
      {rawValue: 3100, label: '2020-04-07T12:00:00'},
      {rawValue: 2200, label: '2020-04-08T12:00:00'},
      {rawValue: 5103, label: '2020-04-09T12:00:00'},
      {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
      {rawValue: 4004, label: '2020-04-11T12:00:00'},
      {rawValue: 6000, label: '2020-04-12T12:00:00'},
      {rawValue: 5500, label: '2020-04-13T12:00:00'},
      {rawValue: 7000, label: '2020-04-14T12:00:00'},
    ],
    color: 'quaternary',
    lineStyle: 'solid' as 'solid',
    // showArea: true,
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 5200, label: '2020-03-01T12:00:00'},
      {rawValue: 7000, label: '2020-03-02T12:00:00'},
      {rawValue: 1000, label: '2020-03-03T12:00:00'},
      {rawValue: 2000, label: '2020-03-04T12:00:00'},
      {rawValue: 5000, label: '2020-03-05T12:00:00'},
      {rawValue: 1000, label: '2020-03-06T12:00:00'},
      {rawValue: 2000, label: '2020-03-07T12:00:00'},
      {rawValue: 5000, label: '2020-03-08T12:00:00'},
      {rawValue: 4000, label: '2020-03-09T12:00:00'},
      {rawValue: 11200, label: '2020-03-10T12:00:00'},
      {rawValue: 2000, label: '2020-03-11T12:00:00'},
      {rawValue: 3000, label: '2020-03-12T12:00:00'},
      {rawValue: 2000, label: '2020-03-13T12:00:00'},
      {rawValue: 3000, label: '2020-03-14T12:00:00'},
    ],
    color: 'pastComparison' as 'pastComparison',
    lineStyle: 'dashed' as 'dashed',
  },
];

export const Light = Template.bind({});
Light.args = {
  data: chartData,
  axisColor: axisColors.light,
  textColor: textColors.light,
  crossHairColor: crossHairColors.light,
};

Light.parameters = {
  backgrounds: {
    default: 'light',
  },
};

export const Dark = Template.bind({});
Dark.args = {
  data: chartData,
  axisColor: axisColors.dark,
  textColor: textColors.dark,
  crossHairColor: crossHairColors.dark,
};

Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
