import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../src/components';
import {
  chartColors,
  backgroundColors,
  axisColors,
  textColors,
  crossHairColors,
  fontFamily,
  containerStyles,
} from './constants';

document.body.style.fontFamily = fontFamily;

export default {
  title: 'Playground/BarChart',
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
      useHardCodedGradient
      background={args.backgroundColor}
      axisColor={args.axisColor}
      textColor={args.textColor}
      crossHairColor={args.crossHairColor}
      isAnimated
      data={Array.from({length: 12}, (_, i) => {
        return {rawValue: Math.random() * 100, label: (i + 1).toString()};
      })}
      color={args.chartColor}
      // highlightColor="inverse"
      formatXAxisLabel={(val) =>
        new Date(val).toLocaleDateString('en-CA', {
          day: 'numeric',
          month: 'short',
        })
      }
      formatYAxisLabel={(val) =>
        new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          maximumSignificantDigits: 2,
        }).format(val)
      }
      timeSeries
      hasRoundedCorners
      useHardCodedGradient
    />
  );
};

export const Light = Template.bind({});
Light.args = {
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
