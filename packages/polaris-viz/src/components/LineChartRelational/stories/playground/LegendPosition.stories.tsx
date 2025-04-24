import type {Story} from '@storybook/react';

import type {LineChartRelationalProps} from '../../LineChartRelational';
import {DEFAULT_DATA, DEFAULT_PROPS, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground/LegendPosition`,
};

export const LegendPosition: Story<LineChartRelationalProps> = Template.bind(
  {},
);

LegendPosition.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  showLegend: true,
  legendPosition: 'right',
};
