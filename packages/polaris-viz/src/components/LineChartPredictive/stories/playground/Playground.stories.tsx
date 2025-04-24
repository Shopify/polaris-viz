import type {Story} from '@storybook/react';

import type {LineChartPredictiveProps} from '../../types';
import {DEFAULT_DATA, DEFAULT_PROPS, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const LegendPosition: Story<LineChartPredictiveProps> = Template.bind(
  {},
);

LegendPosition.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  showLegend: true,
  legendPosition: 'right',
};
