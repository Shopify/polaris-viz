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
} from './constants.stories';

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
      background={args.backgroundColor}
      axisColor={args.axisColor}
      textColor={args.textColor}
      tooltipBackground={args.tooltipBackground}
      crossHairColor={args.crossHairColor}
      isAnimated
      data={[
        {
          rawValue: 63.65351884511108,
          label: '1',
        },
        {
          rawValue: 33.23985370430875,
          label: '2',
        },
        {
          rawValue: 7.474480792354021,
          label: '3',
        },
        {
          rawValue: 100,
          label: '4',
        },
        {
          rawValue: 30.947848374881893,
          label: '5',
        },
        {
          rawValue: 81.71644719873312,
          label: '6',
        },
        {
          rawValue: 86.07020687177011,
          label: '7',
        },
        {
          rawValue: 76.19454629777155,
          label: '8',
        },
        {
          rawValue: 78.50608637701495,
          label: '9',
        },
        {
          rawValue: 47.30862914208209,
          label: '10',
        },
        {
          rawValue: 31.432686819323674,
          label: '11',
        },
        {
          rawValue: 18.130362360245677,
          label: '12',
        },
      ]}
      color={args.chartColor}
      // highlightColor="inverse"
      formatXAxisLabel={(val) =>
        new Date(val)
          .toLocaleDateString('en-CA', {
            day: 'numeric',
            month: 'short',
          })
          .replace('.', '')
      }
      formatYAxisLabel={(val) =>
        new Intl.NumberFormat('en-CA', {
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
  tooltipBackground: 'white',
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
  tooltipBackground: `rgb(46,48,51)`,
};

Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
