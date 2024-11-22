import type {StoryFn} from '@storybook/react';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

import {META} from './meta';

export const SeriesColorsUpToSixteen: StoryFn<DonutChartProps> = Template.bind(
  {},
);

SeriesColorsUpToSixteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(16, 'dates', 1),
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/SeriesColorsUpToSixteen'} as any;