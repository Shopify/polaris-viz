import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

export default {
  title: 'polaris-viz/Playground/Tooltip-o-rama',
  parameters: {},
  decorators: [(Story) => <div>{Story()}</div>],
  argTypes: {},
};

import type {BarChartProps} from '../../../components';
import {
  BarChart,
  LineChart,
  SimpleBarChart,
  StackedAreaChart,
} from '../../../components';

import {useState} from 'react';

const CHART_TYPES = {
  BarChart: BarChart,
  HorizontalBarChart: BarChart,
  LineChart: LineChart,
  SimpleBarChart: SimpleBarChart,
  StackedAreaChart: StackedAreaChart,
};

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  const [isSingle, setIsSingle] = useState(true);
  const [chartType, setChartType] = useState('SimpleBarChart');

  const Element = CHART_TYPES[chartType];
  const direction = chartType === 'BarChart' ? 'vertical' : 'horizontal';

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <div>
        <button onClick={() => setIsSingle(!isSingle)}>
          {isSingle ? 'Set Multiple' : 'Set Single'}
        </button>
        <select onChange={(e) => setChartType(e.target.value)}>
          {Object.keys(CHART_TYPES).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <Div title="Positive">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_POSITIVE : MULTIPLE_SERIES_POSITIVE}
          direction={direction}
        />
      </Div>
      <Div title="Negative">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_NEGATIVE : MULTIPLE_SERIES_NEGATIVE}
          direction={direction}
        />
      </Div>
      <Div title="Mixed">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_MIXED : MULTIPLE_SERIES_MIXED}
          direction={direction}
        />
      </Div>
      <Div title="Positive Stacked">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_POSITIVE : MULTIPLE_SERIES_POSITIVE}
          type="stacked"
          direction={direction}
        />
      </Div>
      <Div title="Negative Stacked">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_NEGATIVE : MULTIPLE_SERIES_NEGATIVE}
          type="stacked"
          direction={direction}
        />
      </Div>
      <Div title="Mixed Stacked">
        <Element
          {...args}
          data={isSingle ? SINGLE_SERIES_MIXED : MULTIPLE_SERIES_MIXED}
          type="stacked"
          direction={direction}
        />
      </Div>
    </div>
  );
};

function Div({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div>
      <h2 style={{color: 'black'}}>{title}</h2>
      <div style={{height: 400}}>{children}</div>
    </div>
  );
}

const SINGLE_SERIES_POSITIVE: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: 7},
      {key: 'Wednesday', value: 7},
      {key: 'Thursday', value: 8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

const SINGLE_SERIES_NEGATIVE: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: -3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: -45},
      {key: 'Saturday', value: -0},
      {key: 'Sunday', value: -0.1},
    ],
  },
];

const SINGLE_SERIES_MIXED: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

const MULTIPLE_SERIES_POSITIVE: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: 7},
      {key: 'Wednesday', value: 7},
      {key: 'Thursday', value: 8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 45},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 15},
      {key: 'Thursday', value: 12},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

const MULTIPLE_SERIES_NEGATIVE: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: -3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: -0},
      {key: 'Sunday', value: -0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: -4},
      {key: 'Tuesday', value: -0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 45},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: -7},
      {key: 'Tuesday', value: -0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: -45},
      {key: 'Saturday', value: -5},
      {key: 'Sunday', value: -0.1},
    ],
  },
];

const MULTIPLE_SERIES_MIXED: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 45},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

export const TooltipOrama: Story<BarChartProps> = Template.bind({
  height: 100,
});

TooltipOrama.args = {
  data: [],
  onError: (a, b) => {
    console.log({a, b});
  },
};
