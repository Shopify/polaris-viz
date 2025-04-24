import type {Story} from '@storybook/react';

import {
  BarChart,
  BarChartProps,
  PolarisVizProvider,
} from '../../../../components';
import type {Annotation} from '../../../../types';
import {META} from '../meta';
import {Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA = [
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 3,
        key: '1',
      },
      {
        value: 0,
        key: '2',
      },
      {
        value: 0,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
      {
        value: 1,
        key: '5',
      },
      {
        value: 0,
        key: '6',
      },
      {
        value: 4,
        key: '7',
      },
      {
        value: 3,
        key: '8',
      },
      {
        value: 4,
        key: '9',
      },
      {
        value: 8,
        key: '10',
      },
      {
        value: 8,
        key: '11',
      },
      {
        value: 5,
        key: '12',
      },
      {
        value: 7,
        key: '13',
      },
      {
        value: 5,
        key: '14',
      },
      {
        value: 3,
        key: '15',
      },
      {
        value: 4,
        key: '16',
      },
      {
        value: 2,
        key: '17',
      },
      {
        value: 6,
        key: '18',
      },
      {
        value: 8,
        key: '19',
      },
      {
        value: 8,
        key: '20',
      },
      {
        value: 3,
        key: '21',
      },
      {
        value: 8,
        key: '22',
      },
      {
        value: 4,
        key: '23',
      },
    ],
    name: 'First-time',
  },
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 0,
        key: '1',
      },
      {
        value: 1,
        key: '2',
      },
      {
        value: 2,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
      {
        value: 0,
        key: '5',
      },
      {
        value: 1,
        key: '6',
      },
      {
        value: 1,
        key: '7',
      },
      {
        value: 2,
        key: '8',
      },
      {
        value: 0,
        key: '9',
      },
      {
        value: 2,
        key: '10',
      },
      {
        value: 12,
        key: '11',
      },
      {
        value: 5,
        key: '12',
      },
      {
        value: 4,
        key: '13',
      },
      {
        value: 4,
        key: '14',
      },
      {
        value: 7,
        key: '15',
      },
      {
        value: 5,
        key: '16',
      },
      {
        value: 6,
        key: '17',
      },
      {
        value: 5,
        key: '18',
      },
      {
        value: 6,
        key: '19',
      },
      {
        value: 6,
        key: '20',
      },
      {
        value: 3,
        key: '21',
      },
      {
        value: 2,
        key: '22',
      },
      {
        value: 2,
        key: '23',
      },
    ],
    name: 'Returning',
  },
];

export const WebData = Template.bind({});

WebData.args = {
  type: 'stacked',
  xAxisOptions: {
    labelFormatter: (value) => {
      const formatter = new Intl.DateTimeFormat('en', {
        timeStyle: 'short',
      });

      return formatter
        .format(new Date(2021, 1, 1, +value!))
        .toLocaleLowerCase()
        .replace('am', 'a.m.')
        .replace('pm', 'p.m.');
    },
  },
  data: DATA,
};

const SingleValuesTemplate: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const SingleValues = SingleValuesTemplate.bind({});

SingleValues.args = {
  type: 'stacked',
  data: DATA,
};

const BarGapOverrideTemplate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Light: {
          bar: {
            gap: 0,
          },
        },
      }}
    >
      <BarChart {...args} />
    </PolarisVizProvider>
  );
};

export const BarGapOverride = BarGapOverrideTemplate.bind({});

BarGapOverride.args = {
  type: 'stacked',
  data: DATA,
};

const MULTIPLE_BARS_DATA = [...new Array(3)].fill(null).map(() => {
  return {
    name: 'total_sales OVER day',
    data: [
      {
        key: 'Apr 30, 2022',
        value: Math.random(),
      },
    ],
  };
});

export const SingleSeriesMultipleBars: Story<BarChartProps> = (
  args: BarChartProps,
) => {
  return (
    <div style={{width: 600, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

SingleSeriesMultipleBars.args = {
  data: MULTIPLE_BARS_DATA,
};

export const LotsOfSingleBars: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

LotsOfSingleBars.args = {
  data: [DATA[0]],
};

export const AnnotationMania: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

AnnotationMania.args = {
  data: DATA,
  annotations: [
    ...[...new Array(23)].fill(null).map((_, index) => {
      return {
        startKey: `${index}`,
        label: `Label ${index}`,
        axis: 'x',
      } as Annotation;
    }),
    ...[...new Array(5)].fill(null).map((_, index) => {
      return {
        startKey: `${index}`,
        label: `Label ${index}`,
        axis: 'y',
      } as Annotation;
    }),
  ],
};

const POINTS = 100;

export const PerformanceTest: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 1000, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

PerformanceTest.args = {
  data: [
    {
      name: 'One',
      data: new Array(POINTS).fill(null).map((_, index) => {
        return {
          value: Math.random() * (25 - 0) + 0,
          key: index,
        };
      }),
    },
    {
      name: 'Two',
      data: new Array(POINTS).fill(null).map((_, index) => {
        return {
          value: Math.random() * (25 - 0) + 0,
          key: index,
        };
      }),
    },
  ],
};

export const JumpyLabels = () => {
  return (
    <BarChart
      data={[
        {
          name: 'Sales',
          data: [
            {
              key: '2022-07-10',
              value: 0,
            },
            {
              key: '2022-07-11',
              value: 0,
            },
            {
              key: '2022-07-12',
              value: 0,
            },
            {
              key: '2022-07-13',
              value: 0,
            },
            {
              key: '2022-07-14',
              value: 0,
            },
            {
              key: '2022-07-15',
              value: 0,
            },
            {
              key: '2022-07-16',
              value: 0,
            },
            {
              key: '2022-07-17',
              value: 0,
            },
            {
              key: '2022-07-18',
              value: 0,
            },
            {
              key: '2022-07-19',
              value: 0,
            },
            {
              key: '2022-07-20',
              value: 0,
            },
            {
              key: '2022-07-21',
              value: 0,
            },
            {
              key: '2022-07-22',
              value: 0,
            },
            {
              key: '2022-07-23',
              value: 0,
            },
            {
              key: '2022-07-24',
              value: 0,
            },
            {
              key: '2022-07-25',
              value: 0,
            },
            {
              key: '2022-07-26',
              value: 0,
            },
            {
              key: '2022-07-27',
              value: 0,
            },
            {
              key: '2022-07-28',
              value: 0,
            },
            {
              key: '2022-07-29',
              value: 0,
            },
            {
              key: '2022-07-30',
              value: 0,
            },
            {
              key: '2022-07-31',
              value: 0,
            },
            {
              key: '2022-08-01',
              value: 0,
            },
            {
              key: '2022-08-02',
              value: 0,
            },
            {
              key: '2022-08-03',
              value: 0,
            },
            {
              key: '2022-08-04',
              value: 0,
            },
            {
              key: '2022-08-05',
              value: 0,
            },
            {
              key: '2022-08-06',
              value: 0,
            },
            {
              key: '2022-08-07',
              value: 0,
            },
            {
              key: '2022-08-08',
              value: 0,
            },
          ],
        },
      ]}
      showLegend={false}
    />
  );
};

JumpyLabels.args = {};

export const JumpyLabelsFromNotebooks = () => {
  return (
    <BarChart
      data={[
        {
          name: 'Total Sales',
          data: [
            {
              key: 'Persistent Cart + Custom Checkout App',
              value: 1899932.26,
            },
            {
              key: 'Feedonomics-Walmart',
              value: 183214.61,
            },
            {
              key: 'Feedonomics-Target',
              value: 84626.41,
            },
            {
              key: 'Online Store',
              value: 17653.79,
            },
            {
              key: 'Draft Orders',
              value: 16524.72,
            },
            {
              key: 'Feedonomics-Amazon',
              value: 8854.52,
            },
            {
              key: 'Gorgias ‑ Live Chat & Helpdesk',
              value: 2195.97,
            },
            {
              key: 'Wholesale',
              value: 389.8,
            },
            {
              key: 'Return & Exchange Portal',
              value: 0,
            },
            {
              key: 'Feedonomics',
              value: -185.69,
            },
          ],
        },
      ]}
      showLegend={false}
    />
  );
};

JumpyLabelsFromNotebooks.args = {};

export const BadData: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};

export const InfinityData: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 500, height: 100}}>
      <BarChart {...args} />
    </div>
  );
};

InfinityData.args = {
  data: [
    {
      name: 'Oct 7–Oct 13, 2024',
      data: [
        {
          key: '0',
          value: 0,
        },
        {
          key: '1',
          value: 0,
        },
      ],
    },
    {
      isComparison: true,
      name: 'Sep 30–Oct 6, 2024',
      data: [
        {
          key: '9',
          value: Infinity,
        },
        {
          key: '10',
          value: 0,
        },
      ],
    },
  ],
};

export const VerticalTruncate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: '100%', height: 100}}>
      <BarChart {...args} xAxisOptions={{labelFormatter: (x) => `Oct. ${x}`}} />
    </div>
  );
};

VerticalTruncate.args = {
  data: DATA,
};

export const DiagonalTruncate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: '100%', height: 100}}>
      <BarChart
        {...args}
        xAxisOptions={{labelFormatter: (x) => `October ${x}, 2024`}}
      />
    </div>
  );
};

DiagonalTruncate.args = {
  data: [
    {
      name: 'Oct 7–Oct 13, 2024',
      data: [
        {
          key: '0',
          value: 0,
        },
        {
          key: '1',
          value: 0,
        },
      ],
    },
    {
      isComparison: true,
      name: 'Sep 30–Oct 6, 2024',
      data: [
        {
          key: '9',
          value: 0,
        },
        {
          key: '10',
          value: 0,
        },
      ],
    },
  ],
};

export const TicksOverride: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

TicksOverride.args = {
  data: DATA,
  yAxisOptions: {
    maxYOverride: 100,
    ticksOverride: [0, 10, 20, 40, 70, 100],
  },
};
