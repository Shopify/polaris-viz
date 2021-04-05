import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart} from '../../src/components';
import {
  chartColors,
  backgroundColors,
  axisColors,
  textColors,
  crossHairColors,
  fontFamily,
  containerStyles,
} from './constants.stories';

document.body.style.fontFamily = fontFamily;

export default {
  title: 'Playground/Histogram',
  component: BarChart,
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
  decorators: [(Story: any) => <div style={containerStyles}>{Story()}</div>],
} as Meta;

const Template: Story<{}> = (args) => {
  return (
    <BarChart
      isAnimated
      skipLinkText="Skip chart content"
      timeSeries
      data={args.data}
      color={args.chartColor}
      background={args.background}
      axisColor={args.axisColor}
      textColor={args.textColor}
      crossHairColor={args.crossHairColor}
      hasRoundedCorners
      leftAlignLabels
      useHardCodedGradient
      lastBarTreatment
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
    annotation: '<strong style="margin-right: 5px">Median</strong> 3.5',
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
    rawValue: 52.476274510608242,
    label: '19 +',
  },
];

export const Light = Template.bind({});
Light.args = {
  data: chartData,
  chartColor: chartColors.blueGreenGradient,
  background: backgroundColors.light,
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
  chartColor: chartColors.blueGreenGradient,
  background: backgroundColors.dark,
  axisColor: axisColors.dark,
  textColor: textColors.dark,
  crossHairColor: crossHairColors.dark,
};

Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
