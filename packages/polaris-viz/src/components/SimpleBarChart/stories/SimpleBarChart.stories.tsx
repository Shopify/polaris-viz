import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {SimpleBarChart, SimpleBarChartProps} from '../SimpleBarChart';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';
import {
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  CHART_STATE_CONTROL_ARGS,
} from '../../../storybook';
import {
  COLOR_OVERRIDE_SERIES,
  COMPARISON_SERIES,
  SERIES,
  SINGLE_SERIES,
} from '../../../storybook/horizontalCharts';

export default {
  title: 'polaris-viz/Charts/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side.  ',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    type: TYPE_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: {
      description:
        'An object used to configure the labels displayed beside the bars.',
      defaultValue: {
        labelFormatter: (value: string) => value,
      },
    },
  },
} as Meta;

const Template: Story<SimpleBarChartProps> = (args: SimpleBarChartProps) => {
  return (
    <div style={{height: '500px'}}>
      <SimpleBarChart {...args} />
    </div>
  );
};

export const Default: Story<SimpleBarChartProps> = Template.bind({});

Default.args = {
  data: SINGLE_SERIES,
};

export const MultipleSeries: Story<SimpleBarChartProps> = Template.bind({});

MultipleSeries.args = {
  data: SERIES,
};

export const Comparison: Story<SimpleBarChartProps> = Template.bind({});

Comparison.args = {
  data: COMPARISON_SERIES,
};

export const OverwrittenSeriesColors: Story<SimpleBarChartProps> =
  Template.bind({});

OverwrittenSeriesColors.args = {
  data: COLOR_OVERRIDE_SERIES,
};

export const SimpleStacked: Story<SimpleBarChartProps> = Template.bind({});

SimpleStacked.args = {
  data: SERIES,
  type: 'stacked',
};

export const DynamicData = () => {
  const [data, setData] = useState([
    {
      name: 'BCFM 2019',
      data: [
        {
          key: 'Womens Leggings',
          value: 3,
        },
        {
          key: 'Mens Bottoms',
          value: 7,
        },
        {
          key: 'Mens Shorts',
          value: 4,
        },
      ],
    },
    {
      name: 'BCFM 2020',
      data: [
        {
          key: 'Womens Leggings',
          value: 1,
        },
        {
          key: 'Mens Bottoms',
          value: 2,
        },
        {
          key: 'Mens Shorts',
          value: 5,
        },
      ],
    },
  ]);

  const onClick = () => {
    const newData = data.map((series) => {
      return {
        ...series,
        data: series.data.map(({key}) => {
          const newValue = Math.floor(Math.random() * 200);
          return {
            key,
            value: newValue,
          };
        }),
      };
    });

    setData(newData);
  };

  return (
    <>
      <div style={{height: '500px', width: 800}}>
        <SimpleBarChart data={data} showLegend={true} />
      </div>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
        onClick={onClick}
      >
        Change Data
      </button>
    </>
  );
};

export const Sorting = () => {
  const [data, setData] = useState(SINGLE_SERIES);

  const onClick = () => {
    setData([
      {
        ...data[0],
        data: [...data[0].data].sort(() => (Math.random() > 0.5 ? 1 : -1)),
      },
    ]);
  };

  return (
    <>
      <div style={{height: '500px', width: 800}}>
        <SimpleBarChart
          data={[{...data[0], data: [...data[0].data.slice(0, 5)]}]}
          showLegend={true}
        />
      </div>
      <button onClick={onClick} style={{marginRight: 10}}>
        Shuffle Position
      </button>
    </>
  );
};
