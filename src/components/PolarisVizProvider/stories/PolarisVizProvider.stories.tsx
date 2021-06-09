import React from 'react';
import {Story, Meta} from '@storybook/react';

import {PolarisVizProvider} from '../../../components';
import type {PolarisVizProviderProps} from '../../../components/PolarisVizProvider';
import {DEFAULT_THEME} from '../../../constants';
import {BarChartDemo} from '../../../../documentation/code';

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
      <BarChartDemo />
    </PolarisVizProvider>
  );
};

const MultipleThemesTemplate: Story<PolarisVizProviderProps> = (
  args: PolarisVizProviderProps,
) => {
  return (
    <PolarisVizProvider {...args}>
      <div style={{height: '180px', marginBottom: '10px'}}>
        <BarChartDemo theme="AngryRed" />
      </div>
      <div style={{height: '180px'}}>
        <BarChartDemo theme="HappyGreen" />
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
      chartContainer: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'white',
      },
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
        color: 'purple',
      },
      grid: {
        showVerticalLines: true,
        showHorizontalLines: true,
        color: '#ebebeb',
        horizontalOverflow: false,
        horizontalMargin: 0,
      },
      xAxis: {
        showTicks: true,
        labelColor: 'gray',
        useMinimalLabels: false,
      },
      yAxis: {
        labelColor: 'gray',
        backgroundColor: 'white',
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

In this example that has an **overwritten Default Theme**, all \`BarCharts\` that are children of this \`PolarisVizProvider\` will have purple bars and white background by default, even if no \`theme\` prop is passed to each \`BarChart\`  👇
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
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
        color: '#00ff64',
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
      chartContainer: {
        padding: '20px',
        borderRadius: '5px',
      },
      bar: {
        hasRoundedCorners: false,
        innerMargin: 'Large',
        outerMargin: 'Large',
        color: '#ff0025',
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
