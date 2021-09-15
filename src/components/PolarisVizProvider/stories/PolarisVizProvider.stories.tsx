import React from 'react';
import {Story, Meta} from '@storybook/react';

import {PolarisVizProvider} from 'components';
import type {PolarisVizProviderProps} from 'components/PolarisVizProvider';
import {DEFAULT_THEME} from 'consts';
import {BarChart, BarChartTooltipContent} from 'components';

export function BarChartDemo() {
  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const data = [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
    {
      rawValue: 25.6,
      label: '2020-01-04T12:00:00Z',
    },
    {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ];

  function formatXAxisLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'short',
    });
  }

  function formatYAxisLabel(value: number) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  function renderTooltipContent({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) {
    function formatTooltipLabel(value: string) {
      return new Date(value).toLocaleDateString('en-CA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    function formatTooltipValue(value: number) {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(value);
    }

    const formattedLabel = formatTooltipLabel(label);
    const formattedValue = formatTooltipValue(value);

    return (
      <BarChartTooltipContent label={formattedLabel} value={formattedValue} />
    );
  }

  return (
    <BarChart
      data={data}
      xAxisOptions={{
        labelFormatter: formatXAxisLabel,
      }}
      yAxisOptions={{
        labelFormatter: formatYAxisLabel,
      }}
      renderTooltipContent={renderTooltipContent}
      skipLinkText="Skip chart content"
    />
  );
}

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
      tooltip: {
        backgroundColor: '#F6F6F7',
        labelColor: 'black',
        valueColor: 'black',
      },
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
      seriesColors: {
        upToFour: ['#00ff64'],
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
        upToFour: ['#ff0025'],
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
