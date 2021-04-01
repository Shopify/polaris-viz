import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../src/components';
import styles from './Playground.stories.scss';

const backgroundColor = '#1f1f25';
const axisColor = '#414247';
const textColor = '#dcdcdc';

document.body.style.fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

export default {
  title: 'BarChart',
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
      useHardCodedGradient
      axisColor={axisColor}
      textColor={textColor}
      crossHairColor="dark"
      isAnimated
      data={Array.from({length: 12}, (_, i) => {
        return {rawValue: Math.random() * 100, label: (i + 1).toString()};
      })}
      color="blueGreenGradient"
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

export const Default = Template.bind({});
