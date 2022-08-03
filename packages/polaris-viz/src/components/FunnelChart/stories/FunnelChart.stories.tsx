import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';
import {THEME_CONTROL_ARGS, CHART_STATE_CONTROL_ARGS} from '../../../storybook';
import {FunnelChart, FunnelChartProps} from '../FunnelChart';

export default {
  title: 'polaris-viz/Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show conversion data.',
      },
      yScale: {
        controls: null,
      },
      xScale: {
        controls: null,
      },
    },
  },
  argTypes: {
    xAxisOptions: {
      description: `Used to pass a labelFormatter function to format the values displayed on Y axis`,
    },
    yAxisOptions: {
      description:
        'Used to pass a labelFormatter function to format the values displayed on Y axis',
    },
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
} as Meta;

const data = [
  {
    data: [
      {
        value: 126,
        key: 'Opens',
      },
      {
        value: 48,
        key: 'Visitors',
      },
      {
        value: 12,
        key: 'Added to carts',
      },
      {
        value: 0,
        key: 'Orders',
      },
    ],
    name: 'Conversion',
  },
];

const DefaultTemplate: Story<FunnelChartProps> = (args: FunnelChartProps) => {
  return (
    <div style={{height: 400}}>
      <FunnelChart {...args} />
    </div>
  );
};

export const Default = DefaultTemplate.bind({});

Default.args = {
  data,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
};

export const Light = DefaultTemplate.bind({});

Light.args = {
  theme: 'Light',
  data,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
};

export const DynamicData = () => {
  const [data, setData] = useState({
    name: 'Sales',
    data: [
      {value: 100, key: 'Opens'},
      {value: 80, key: 'Visitors'},
      {value: 50, key: 'Added to cart'},
      {value: 0, key: 'Orders'},
    ],
  });

  const onClick = () => {
    const newData = data.data.map(({key}) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        key,
        value: newValue,
      };
    });
    setData({
      name: data.name,
      data: newData,
    });
  };

  return (
    <div style={{height: 400}}>
      <FunnelChart data={[data]} />
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
    </div>
  );
};
