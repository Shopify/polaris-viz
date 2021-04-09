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
      tooltipBackground={args.tooltipBackground}
      hasRoundedCorners
      leftAlignLabels
      useHardCodedGradient
      lastBarTreatment
    />
  );
};

const chartData = [
  {
    rawValue: 10,
    label: '0',
  },
  {
    rawValue: 45,
    label: '1',
  },
  {
    rawValue: 16,
    label: '2',
  },
  {
    rawValue: 9,
    label: '3',
    annotation:
      '<span style="color: #607175">Median</span> <br /><span style="margin-right: 5px; margin-top: 18px; font-size: 16px; font-weight: 400">3.5</span>',
  },
  {
    rawValue: 32,
    label: '4',
  },
  {
    rawValue: 85,
    label: '5',
  },
  {
    rawValue: 74,
    label: '6',
  },
  {
    rawValue: 100,
    label: '7',
  },
  {
    rawValue: 58,
    label: '8',
  },
  {
    rawValue: 40,
    label: '9',
  },
  {
    rawValue: 58,
    label: '10',
  },
  {
    rawValue: 64,
    label: '11',
  },
  {
    rawValue: 9,
    label: '12',
  },
  {
    rawValue: 26,
    label: '13',
  },
  {
    rawValue: 34,
    label: '14',
  },
  {
    rawValue: 50,
    label: '15',
  },
  {
    rawValue: 56,
    label: '16',
  },
  {
    rawValue: 85,
    label: '17',
  },
  {
    rawValue: 2,
    label: '18',
  },
  {
    rawValue: 52,
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
  tooltipBackground: 'white',
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
  tooltipBackground: `rgb(46,48,51)`,
};

Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
