import type {Story} from '@storybook/react';
import {BarChart} from '../../BarChart';
import {DonutChart} from '../../DonutChart';
import {FunnelChart} from '../../FunnelChart';
import {LineChart} from '../../LineChart';
import {LineChartRelational} from '../../LineChartRelational';
import {SimpleBarChart} from '../../SimpleBarChart';
import {SimpleNormalizedChart} from '../../SimpleNormalizedChart';
import {SparkBarChart} from '../../SparkBarChart';
import {SparkLineChart} from '../../SparkLineChart';
import {StackedAreaChart} from '../../StackedAreaChart';
import {PolarisVizProvider} from '../PolarisVizProvider';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

export default {
  title: `chromatic/PolarisVizProvider/Chromatic`,
  chromatic: {disableSnapshot: false},
};

const COMPONENTS = {
  BarChart: BarChart,
  FunnelChart: FunnelChart,
  LineChart: LineChart,
  LineChartRelational: LineChartRelational,
  SimpleBarChart: SimpleBarChart,
  SparkBarChart: SparkBarChart,
  SparkLineChart: SparkLineChart,
  StackedAreaChart: StackedAreaChart,
};

const SPECIAL_COMPONENTS = {
  DonutChart: (
    <DonutChart
      data={[
        {
          name: 'Shopify Payments',
          data: [{key: 'april - march', value: 50000}],
        },
        {
          name: 'Paypal',
          data: [{key: 'april - march', value: 25000}],
        },
      ]}
    />
  ),
  SimpleNormalizedChart: (
    <SimpleNormalizedChart
      data={[
        {
          name: 'Facebook',
          data: [
            {
              key: 'April 2022',
              value: 100,
            },
          ],
        },
        {
          name: 'Google',
          data: [
            {
              key: 'April 2022',
              value: 20,
            },
          ],
        },
      ]}
    />
  ),
};

const DATA = [
  {
    name: 'Title',
    data: [
      {key: '1', value: 5},
      {key: '2', value: 10},
      {key: '3', value: 15},
      {key: '4', value: 20},
    ],
  },
];

function Grid({singleTheme}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      <>
        {Object.keys(COMPONENTS).map((key, index) => {
          const Component = COMPONENTS[key];
          return (
            <div>
              <p style={{color: 'red'}}>{key}</p>
              <div style={{height: 200, width: 300}}>
                <Component
                  data={DATA}
                  isAnimated={false}
                  theme={index === 3 ? singleTheme : undefined}
                />
              </div>
            </div>
          );
        })}
        {Object.keys(SPECIAL_COMPONENTS).map((key) => {
          const Component = SPECIAL_COMPONENTS[key];
          return (
            <div>
              <p style={{color: 'red'}}>{key}</p>
              <div style={{height: 200, width: 300}}>{Component}</div>
            </div>
          );
        })}
      </>
    </div>
  );
}

const Template: Story = (args) => {
  return (
    <PolarisVizProvider defaultTheme={args.theme}>
      <Grid singleTheme={args.singleTheme} />
    </PolarisVizProvider>
  );
};

export const DefaultTheme: Story = Template.bind({});

DefaultTheme.args = {};

export const OverideDefaultTheme: Story = Template.bind({});

OverideDefaultTheme.args = {
  theme: 'Dark',
};

export const DefaultThemeWithSingle: Story = Template.bind({});

DefaultThemeWithSingle.args = {
  singleTheme: DEFAULT_THEME_NAME,
};

export const OverideDefaultThemeWithSingle: Story = Template.bind({});

OverideDefaultThemeWithSingle.args = {
  theme: 'Dark',
  singleTheme: DEFAULT_THEME_NAME,
};
