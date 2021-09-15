import React from 'react';
import {Story, Meta} from '@storybook/react';

import {PolarisVizProvider} from '../../../components';
import type {PolarisVizProviderProps} from '../../../components/PolarisVizProvider';
import {DEFAULT_THEME} from '../../../constants';
import {defaultProps as defaultBarChartProps} from '../../BarChart/stories/utils.stories';
import {BarChart} from '../../BarChart';

const barChartProps = {
  ...defaultBarChartProps,
  data: [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 213.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 500, label: '2020-01-04T12:00:00Z'},
    {rawValue: 540, label: '2020-01-05T12:00:00Z'},
    {rawValue: 551.19, label: '2020-01-06T12:00:00Z'},
  ],
};
export default {
  title: 'Providers/PolarisVizProvider',
  component: PolarisVizProvider,
  parameters: {
    docs: {
      description: {
        component: `
The \`PolarisVizProvider\` is an optional component that you can use to:
\n - Overwite the default styles of all charts in your application
\n - Define multiple themes that can be used by each instance of your charts

By including the \`PolarisVizProvider\` as a top level component in your application, each child chart will have access to the themes you define in the  \`themes\` prop.

This is what the **Default Polaris Viz theme** looks like in a BarChart 👇
        `,
      },
    },
  },
  argTypes: {
    themes: {
      defaultValue: {Default: DEFAULT_THEME},
      description:
        'A collection of themes. If nothing is provided it uses the Default Polaris Viz theme. You can define multiple themes here, and choose which one should be used in your chart instance.',
      table: {
        type: {
          summary: 'Record<string, PartialTheme>',
        },
        defaultValue: {
          summary: '-',
        },
      },
      control: {
        type: 'object',
      },
    },
  },
} as Meta;

const Template: Story<PolarisVizProviderProps> = (
  args: PolarisVizProviderProps,
) => {
  return (
    <PolarisVizProvider {...args}>
      <BarChart {...barChartProps} />
    </PolarisVizProvider>
  );
};

const LightTemplate: Story<PolarisVizProviderProps> = (
  args: PolarisVizProviderProps,
) => {
  return (
    <PolarisVizProvider {...args}>
      <BarChart {...barChartProps} theme="Light" />
    </PolarisVizProvider>
  );
};

const MultipleThemesTemplate: Story<PolarisVizProviderProps> = (
  args: PolarisVizProviderProps,
) => {
  return (
    <PolarisVizProvider {...args}>
      <div style={{height: '180px', marginBottom: '10px'}}>
        <BarChart {...barChartProps} theme="AngryRed" />
      </div>
      <div style={{height: '180px'}}>
        <BarChart {...barChartProps} theme="HappyGreen" />
      </div>
    </PolarisVizProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: `
<PolarisVizProvider>
  <BarChart />
</PolarisVizProvider>`,
    },
  },
  viewMode: 'docs',
};

export const OverwrittenDefault = Template.bind({});
OverwrittenDefault.args = {
  themes: {
    Default: {
      tooltip: {
        backgroundColor: '#F6F6F7',
        labelColor: 'black',
        valueColor: 'black',
      },
      seriesColors: {
        single: [
          {
            color: '#c0ff00',
            offset: 0,
          },
          {
            color: '#e2fd01',
            offset: 100,
          },
        ],
      },
      chartContainer: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#121216',
      },
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
      },
      grid: {
        showVerticalLines: true,
        showHorizontalLines: true,
        color: '#383841',
        horizontalOverflow: false,
        horizontalMargin: 0,
      },
      xAxis: {
        showTicks: true,
        labelColor: '#c1c1d3',
        useMinimalLabels: false,
      },
      yAxis: {
        labelColor: '#c1c1d3',
        backgroundColor: '#121216',
        integersOnly: false,
      },
    },
  },
};
OverwrittenDefault.parameters = {
  viewMode: 'docs',
  backgrounds: {
    default: 'light',
  },
  docs: {
    description: {
      story: `
If you want all charts to have custom styles to be applied to all charts by default, just overwrite the \`Default\` key in the themes object.

In this example that has an **overwritten Default Theme**, all \`BarCharts\` that are children of this \`PolarisVizProvider\` will have yellow bars and black background by default, even if no \`theme\` prop is passed to each \`BarChart\`  👇
      `,
    },
  },
};

export const OverwrittenLight = LightTemplate.bind({});
OverwrittenLight.args = {
  themes: {
    Light: {
      seriesColors: {
        single: [
          {
            color: '#c0ff00',
            offset: 0,
          },
          {
            color: '#a6d803',
            offset: 100,
          },
        ],
      },
      chartContainer: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'white',
      },
    },
  },
};
OverwrittenLight.parameters = {
  viewMode: 'docs',
  backgrounds: {
    default: 'light',
  },
  docs: {
    description: {
      story: `The Library also comes with a  \`Light\` theme out of the box. The same you can tweak the \`Default\` theme by overwriting keys, you can do the same with \`Light\` 👇.
      `,
    },
  },
};

export const MultipleThemes = MultipleThemesTemplate.bind({});
MultipleThemes.args = {
  themes: {
    HappyGreen: {
      chartContainer: {
        padding: '20px',
        borderRadius: '5px',
      },
      seriesColors: {
        single: ['#00ff64'],
      },
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
      },
      grid: {
        showVerticalLines: true,
        showHorizontalLines: true,
        color: '#000000',
        horizontalOverflow: false,
        horizontalMargin: 0,
      },
      xAxis: {
        showTicks: true,
        labelColor: '#FFF',
      },
      yAxis: {
        labelColor: '#FFF',
      },
    },
    AngryRed: {
      seriesColors: {
        single: ['#ff0025'],
      },
      chartContainer: {
        padding: '20px',
        borderRadius: '5px',
      },
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
      },
      grid: {
        showVerticalLines: true,
        showHorizontalLines: true,
        color: '#000000',
        horizontalOverflow: false,
        horizontalMargin: 0,
      },
      xAxis: {
        showTicks: true,
        labelColor: '#FFF',
        useMinimalLabels: false,
      },
      yAxis: {
        labelColor: '#FFF',
        integersOnly: false,
      },
    },
  },
};
MultipleThemes.parameters = {
  viewMode: 'docs',
  backgrounds: {
    default: 'light',
  },
  docs: {
    description: {
      story: `
You can also define multiple extra themes in the \`themes\` object.
Each top level key in this object will be used as a theme name, that
later on you can pass to individual charts.

In this example, the first chart uses a theme named \`AngryRed\` and the second \`HappyGreen\` 👇
        `,
    },
  },
};
