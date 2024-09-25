import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Charts/BarChart/Playground/UnformattedAnnotationKeys',
};

import type {BarChartProps} from '../../../../components';

import {Template} from '../data';
import {META} from '../meta';

export const UnformattedAnnotationKeys: Story<BarChartProps> = Template.bind(
  {},
);

const MONTHS = 12;

const data = [
  {
    name: 'Data Series',
    data: [...Array(MONTHS).keys()].map((index) => ({
      key: `${index}`,
      value: MONTHS - index,
    })),
  },
];

UnformattedAnnotationKeys.args = {
  data,
  annotations: [
    {
      axis: 'x',
      label: 'Formatted',
      startAxisLabel: 'Monday',
    },
    {
      axis: 'x',
      label: 'Unformatted',
      startKey: '5',
    },
  ],
  xAxisOptions: {
    labelFormatter: (value) => {
      if (value === '3') {
        return 'Monday';
      }

      return '';
    },
  },
};
