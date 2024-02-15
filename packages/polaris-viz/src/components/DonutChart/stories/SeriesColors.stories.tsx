import type {Story} from '@storybook/react';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export {META as default} from './meta';

export const SeriesColorsUpToSixteen: Story<DonutChartProps> = Template.bind(
  {},
);

SeriesColorsUpToSixteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(16, 'dates', 1),
};
