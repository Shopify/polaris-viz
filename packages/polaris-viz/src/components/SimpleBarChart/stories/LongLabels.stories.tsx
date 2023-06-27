import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {LONG_LABEL_SERIES, Template} from './data';

export const LongLabels: Story<SimpleBarChartProps> = Template.bind({});

LongLabels.args = {
  data: LONG_LABEL_SERIES,
  xAxisOptions: {
    labelFormatter: (value) => `${value} products sold with a very long label`,
  },
};
