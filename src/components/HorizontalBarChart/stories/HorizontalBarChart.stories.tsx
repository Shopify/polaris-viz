import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  HorizontalBarChart,
  HorizontalBarChartProps,
} from '../HorizontalBarChart';

import type {Series} from '../types';

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];

function buildSeries(items: number[] | number[][]): Series[] {
  return [
    'Womens Leggings',
    'Mens Bottoms',
    'Mens Shorts',
    'Socks',
    'Hats',
    'Ties',
  ].map((name, index) => {
    const item = items[index];
    const array = Array.isArray(item) ? item : [item];
    return {
      name,
      data: array.map((number, dataIndex) => {
        return {rawValue: number, label: LABELS[dataIndex]};
      }),
    };
  });
}

const SERIES = buildSeries([
  [3, 4, 7],
  [7, 1, 1],
  [4, 5, 6],
  [8, 15, 12],
  [48, 8, 50],
  [1, 5, 5],
]);
const CONTAINER_HEIGHT = 500;

const SINGLE_SERIES = buildSeries([3, 7, 4, 8, 4, 1, 4, 6]);

export default {
  title: 'Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    previewHeight: 'auto',
  },
} as Meta;

const Template: Story<HorizontalBarChartProps> = (
  args: HorizontalBarChartProps,
) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <HorizontalBarChart {...args} />
    </div>
  );
};

const SimpleTemplate: Story<HorizontalBarChartProps> = (
  args: HorizontalBarChartProps,
) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <HorizontalBarChart isSimple={true} {...args} />
    </div>
  );
};

export const Default: Story<HorizontalBarChartProps> = Template.bind({});

Default.args = {
  series: SERIES,
};

export const MultiSeriesAllNegative: Story<HorizontalBarChartProps> = Template.bind(
  {},
);

MultiSeriesAllNegative.args = {
  series: buildSeries([
    [-3, -4, -7],
    [-7, -1, -1],
    [-4, -5, -6],
    [-8, -15, -12],
    [-48, -8, -50],
    [-1, -5, -5],
  ]),
  isAnimated: false,
};

export const SingleBar: Story<HorizontalBarChartProps> = Template.bind({});

SingleBar.args = {
  series: buildSeries([13, 7, 10, 8, 47, 1]),
  isAnimated: false,
};

export const SingleBarNegative: Story<HorizontalBarChartProps> = Template.bind(
  {},
);

SingleBarNegative.args = {
  series: buildSeries([13, -10, -30, 8, 47, 1]),
};

export const SingleBarAllNegative: Story<HorizontalBarChartProps> = Template.bind(
  {},
);

SingleBarAllNegative.args = {
  series: buildSeries([-13, -7, -10, -8, -47, -1]),
};

export const ColorOverrides: Story<HorizontalBarChartProps> = Template.bind({});
ColorOverrides.args = {
  series: [
    {
      name: 'Shirt',
      data: [
        {rawValue: 4, color: 'red', label: 'Yesterday'},
        {rawValue: 7, label: 'Today'},
      ],
    },
    {
      name: 'Pants',
      data: [
        {rawValue: 5, label: 'Yesterday'},
        {rawValue: 6, label: 'Today'},
      ],
    },
    {
      name: 'Shoes',
      data: [
        {rawValue: 15, label: 'Yesterday'},
        {rawValue: 12, label: 'Today'},
      ],
    },
  ],
};

export const LongLabels: Story<HorizontalBarChartProps> = Template.bind({});

LongLabels.args = {
  series: SERIES,
  xAxisOptions: {
    labelFormatter: (value) =>
      `${value} pickled peppers and pickles and a few more things`,
  },
};

export const SimpleHorizontalChart: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleHorizontalChart.args = {
  series: SINGLE_SERIES,
};

export const SimpleLongLabels: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleLongLabels.args = {
  series: buildSeries([
    100000000,
    200000000,
    300000000,
    400000000,
    500000000,
    600000000,
  ]),
};

export const SimpleFormattedLabels: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleFormattedLabels.args = {
  series: buildSeries([
    100000000,
    200000000,
    300000000,
    400000000,
    500000000,
    600000000,
  ]),
  xAxisOptions: {labelFormatter: (value) => `${value} pickles`},
};

export const SimpleNegative: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleNegative.args = {
  series: buildSeries([1300, -1000, -3000, 800, 4700, 100]),
};

export const SimpleAllNegative: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleAllNegative.args = {
  series: buildSeries([-13, -7, -10, -8, -47, -1]),
};

export const Stacked: Story<HorizontalBarChartProps> = Template.bind({});

Stacked.args = {
  series: SERIES,
  isStacked: true,
};

export const SimpleStacked: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleStacked.args = {
  series: SERIES,
  isStacked: true,
};

export const Sorting = () => {
  const [data, setData] = useState(SINGLE_SERIES);

  const onClick = () => {
    setData([...data].sort(() => (Math.random() > 0.5 ? 1 : -1)));
  };

  const onChangeClick = () => {
    const newData = data.map((value) => {
      return {
        ...value,
        data: value.data.map(({rawValue, label}) => {
          return {
            label,
            rawValue: rawValue + Math.floor(Math.random() * 10),
          };
        }),
      };
    });
    setData(newData);
  };

  return (
    <>
      <SimpleHorizontalChart series={[...data].splice(0, 5)} />
      <button onClick={onClick} style={{marginRight: 10}}>
        Shuffle Position
      </button>
      <button onClick={onChangeClick}>Change Data</button>
    </>
  );
};
