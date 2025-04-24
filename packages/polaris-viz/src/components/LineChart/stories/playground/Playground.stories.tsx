import type {Story} from '@storybook/react';

import {LineChart, LineChartProps} from '../../LineChart';
import {generateDataSet, randomNumber} from '../../../Docs/utilities';
import {
  formatLinearXAxisLabel,
  formatLinearYAxisLabel,
} from '../../../../storybook/utilities';
import {META} from '../meta';
import {renderLinearTooltipContent} from '../../../../utilities';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

const COHORT_DATA = [
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1089,
      },
      {
        key: 2,
        value: 0.0749,
      },
      {
        key: 3,
        value: 0.0594,
      },
      {
        key: 4,
        value: 0.0541,
      },
      {
        key: 5,
        value: 0.0506,
      },
      {
        key: 6,
        value: 0.0491,
      },
      {
        key: 7,
        value: 0.0438,
      },
      {
        key: 8,
        value: 0.0413,
      },
      {
        key: 9,
        value: 0.0376,
      },
      {
        key: 10,
        value: 0.0376,
      },
      {
        key: 11,
        value: 0.0413,
      },
    ],
    color: '#33798c',
    name: 'Average',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1178,
      },
      {
        key: 2,
        value: 0.1272,
      },
      {
        key: 3,
        value: 0.0696,
      },
      {
        key: 4,
        value: 0.0587,
      },
      {
        key: 5,
        value: 0.0603,
      },
      {
        key: 6,
        value: 0.0644,
      },
      {
        key: 7,
        value: 0.055,
      },
      {
        key: 8,
        value: 0.058,
      },
      {
        key: 9,
        value: 0.0416,
      },
      {
        key: 10,
        value: 0.04,
      },
      {
        key: 11,
        value: 0.0413,
      },
    ],
    color: '#4b92e5',
    name: '2021-09-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1458,
      },
      {
        key: 2,
        value: 0.0747,
      },
      {
        key: 3,
        value: 0.0599,
      },
      {
        key: 4,
        value: 0.0589,
      },
      {
        key: 5,
        value: 0.0609,
      },
      {
        key: 6,
        value: 0.0524,
      },
      {
        key: 7,
        value: 0.054,
      },
      {
        key: 8,
        value: 0.0392,
      },
      {
        key: 9,
        value: 0.0369,
      },
      {
        key: 10,
        value: 0.0356,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#7f4afa',
    name: '2021-10-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1087,
      },
      {
        key: 2,
        value: 0.0677,
      },
      {
        key: 3,
        value: 0.0604,
      },
      {
        key: 4,
        value: 0.0622,
      },
      {
        key: 5,
        value: 0.052,
      },
      {
        key: 6,
        value: 0.0556,
      },
      {
        key: 7,
        value: 0.0388,
      },
      {
        key: 8,
        value: 0.0371,
      },
      {
        key: 9,
        value: 0.036,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b176e2',
    name: '2021-11-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.09,
      },
      {
        key: 2,
        value: 0.0669,
      },
      {
        key: 3,
        value: 0.0643,
      },
      {
        key: 4,
        value: 0.0518,
      },
      {
        key: 5,
        value: 0.0527,
      },
      {
        key: 6,
        value: 0.0383,
      },
      {
        key: 7,
        value: 0.0371,
      },
      {
        key: 8,
        value: 0.0355,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b1489e',
    name: '2021-12-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1063,
      },
      {
        key: 2,
        value: 0.0784,
      },
      {
        key: 3,
        value: 0.0596,
      },
      {
        key: 4,
        value: 0.0587,
      },
      {
        key: 5,
        value: 0.0421,
      },
      {
        key: 6,
        value: 0.0392,
      },
      {
        key: 7,
        value: 0.0377,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b66e3f',
    name: '2022-01-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1199,
      },
      {
        key: 2,
        value: 0.0737,
      },
      {
        key: 3,
        value: 0.0687,
      },
      {
        key: 4,
        value: 0.0467,
      },
      {
        key: 5,
        value: 0.0436,
      },
      {
        key: 6,
        value: 0.0414,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#bdb24e',
    name: '2022-02-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1032,
      },
      {
        key: 2,
        value: 0.0796,
      },
      {
        key: 3,
        value: 0.0507,
      },
      {
        key: 4,
        value: 0.0454,
      },
      {
        key: 5,
        value: 0.0423,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#4c9aaf',
    name: '2022-03-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.113,
      },
      {
        key: 2,
        value: 0.06,
      },
      {
        key: 3,
        value: 0.0511,
      },
      {
        key: 4,
        value: 0.0459,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#4282cd',
    name: '2022-04-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.0884,
      },
      {
        key: 2,
        value: 0.0605,
      },
      {
        key: 3,
        value: 0.051,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#997afc',
    name: '2022-05-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1001,
      },
      {
        key: 2,
        value: 0.0659,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#9f41dc',
    name: '2022-06-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.0966,
      },
      {
        key: 2,
        value: null,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#da62c4',
    name: '2022-07-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: null,
      },
      {
        key: 2,
        value: null,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#7a4621',
    name: '2022-08-01T00:00:00-07:00',
  },
];

const HOURLY_DATA = [
  {
    name: 'Hourly Data',
    data: Array(743)
      .fill(null)
      .map((_, index) => {
        return {
          key: new Date(2021, 1, 1, index).toISOString(),
          value: randomNumber(0, 400),
        };
      }),
  },
];

export const LargeDataSet: Story<LineChartProps> = Template.bind({});

LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
};

export const BadData: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <LineChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};

export const CohortDataSet: Story<LineChartProps> = Template.bind({});

CohortDataSet.args = {
  data: COHORT_DATA,
};

export const CohortComparisonDataSet: Story<LineChartProps> = Template.bind({});

CohortComparisonDataSet.args = {
  data: [
    {
      data: [
        {
          key: 0,
          value: 1,
        },
        {
          key: 1,
          value: 0.113,
        },
        {
          key: 2,
          value: 0.06,
        },
        {
          key: 3,
          value: 0.0511,
        },
        {
          key: 4,
          value: 0.0459,
        },
        {
          key: 5,
          value: null,
        },
        {
          key: 6,
          value: null,
        },
        {
          key: 7,
          value: null,
        },
        {
          key: 8,
          value: null,
        },
        {
          key: 9,
          value: null,
        },
        {
          key: 10,
          value: null,
        },
        {
          key: 11,
          value: null,
        },
      ],
      color: '#4282cd',
      name: '2022-04-01T00:00:00-07:00',
    },
    {
      data: [
        {
          key: 0,
          value: 1,
        },
        {
          key: 1,
          value: 0,
        },
        {
          key: 2,
          value: 0,
        },
        {
          key: 3,
          value: 0,
        },
        {
          key: 4,
          value: 0,
        },
      ],
      color: '#997afc',
      name: '2022-05-01T00:00:00-07:00',
    },
  ],
};

export const MissingData: Story<LineChartProps> = Template.bind({});

MissingData.args = {
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: 132, key: '2020-04-05T12:00:00'},
        {value: 159, key: '2020-04-06T12:00:00'},
        {value: 239, key: '2020-04-07T12:00:00'},
      ],
    },
    {
      name: 'Previous month',
      data: [
        {value: 709, key: '2020-03-02T12:00:00'},
        {value: 238, key: '2020-03-01T12:00:00'},
        {value: 190, key: '2020-03-03T12:00:00'},
        {value: 90, key: '2020-03-04T12:00:00'},
        {value: 237, key: '2020-03-05T12:00:00'},
        {value: 580, key: '2020-03-07T12:00:00'},
        {value: 172, key: '2020-03-06T12:00:00'},
        {value: 12, key: '2020-03-08T12:00:00'},
        {value: 390, key: '2020-03-09T12:00:00'},
        {value: 43, key: '2020-03-10T12:00:00'},
        {value: 710, key: '2020-03-11T12:00:00'},
        {value: 791, key: '2020-03-12T12:00:00'},
        {value: 623, key: '2020-03-13T12:00:00'},
        {value: 21, key: '2020-03-14T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};

export const PatchyData: Story<LineChartProps> = Template.bind({});

PatchyData.args = {
  tooltipOptions: {
    renderTooltipContent: () => null,
  },
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: null, key: '2020-04-05T12:00:00'},
        {value: 159, key: '2020-04-06T12:00:00'},
        {value: 239, key: '2020-04-07T12:00:00'},
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: null, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: 132, key: '2020-04-05T12:00:00'},
        {value: 159, key: '2020-04-06T12:00:00'},
        {value: 24, key: '2020-04-07T12:00:00'},
      ],
    },
    {
      name: 'Previous month',
      data: [
        {value: 709, key: '2020-03-02T12:00:00'},
        {value: 238, key: '2020-03-01T12:00:00'},
        {value: 34, key: '2020-03-03T12:00:00'},
        {value: 90, key: '2020-03-04T12:00:00'},
        {value: 237, key: '2020-03-05T12:00:00'},
        {value: 580, key: '2020-03-07T12:00:00'},
        {value: 35, key: '2020-03-06T12:00:00'},
        {value: 12, key: '2020-03-08T12:00:00'},
        {value: 390, key: '2020-03-09T12:00:00'},
        {value: 43, key: '2020-03-10T12:00:00'},
        {value: 710, key: '2020-03-11T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};

export const LinearComparisonTooltip: Story<LineChartProps> = Template.bind({});

LinearComparisonTooltip.args = {
  tooltipOptions: {
    renderTooltipContent: (tooltipData) => {
      return renderLinearTooltipContent(tooltipData, {
        groups: [
          {title: 'Net sales', indexes: [0, 1]},
          {title: 'Average order value', indexes: [2, 3, 18]},
        ],
      });
    },
    valueFormatter: formatLinearYAxisLabel,
  },
  data: [
    {
      name: 'Bfcm sales',
      data: [
        {
          key: 'Nov 25, 2022',
          value: 4597927.99,
        },
        {
          key: 'Nov 26, 2022',
          value: 4597927.99,
        },
        {
          key: 'Nov 27, 2022',
          value: 4597927.99,
        },
      ],
    },
    {
      name: 'Bfcm sales bfcm2021',
      isComparison: true,
      data: [
        {
          key: 'Nov 26, 2021',
          value: 1856721.98,
        },
        {
          key: 'Nov 27, 2021',
          value: 1856721.98,
        },
        {
          key: 'Nov 28, 2021',
          value: 1856721.98,
        },
      ],
    },
    {
      name: 'AOV',
      data: [
        {
          key: 'Nov 25, 2022',
          value: 5597927.99,
        },
        {
          key: 'Nov 26, 2022',
          value: 5597927.99,
        },
        {
          key: 'Nov 27, 2022',
          value: 5597927.99,
        },
      ],
    },
    {
      name: 'AOV bfcm2021',
      isComparison: true,
      data: [
        {
          key: 'Nov 26, 2021',
          value: 1956721.98,
        },
        {
          key: 'Nov 27, 2021',
          value: 1956721.98,
        },
        {
          key: 'Nov 28, 2021',
          value: 1956721.98,
        },
      ],
    },
  ],
};

export const LongLegend: Story<LineChartProps> = Template.bind({});

LongLegend.args = {
  data: [
    {
      name: 'Garlic & Herb Biltong Slab - Family Size Super Pack',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: 'Chili Biltong Slab 8oz',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: 'Sale',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: '1',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: 'Smokehouse Biltong',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: 'Traditional Biltong Slab 8oz',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: '2',
      data: generateDataSet(10, 'dates'),
    },
    {
      name: 'A Very Very Very Very Very Long Titled Biltong',
      data: generateDataSet(10, 'dates'),
    },

    {
      name: '3',
      data: generateDataSet(10, 'dates'),
    },
  ],
};

export const TicksOverride: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

TicksOverride.args = {
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 33, key: '2020-04-01T12:00:00'},
        {value: 97, key: '2020-04-02T12:00:00'},
        {value: 34, key: '2020-04-03T12:00:00'},
        {value: 34, key: '2020-04-04T12:00:00'},
        {value: 32, key: '2020-04-05T12:00:00'},
        {value: 59, key: '2020-04-06T12:00:00'},
        {value: 39, key: '2020-04-07T12:00:00'},
        {value: 8, key: '2020-04-08T12:00:00'},
        {value: 34, key: '2020-04-09T12:00:00'},
        {value: 45, key: '2020-04-10T12:00:00'},
        {value: 43, key: '2020-04-11T12:00:00'},
        {value: 9, key: '2020-04-12T12:00:00'},
        {value: 49, key: '2020-04-13T12:00:00'},
        {value: 29, key: '2020-04-14T12:00:00'},
      ],
    },
  ],
  yAxisOptions: {
    maxYOverride: 100,
    ticksOverride: [0, 10, 20, 40, 70, 100],
  },
};
