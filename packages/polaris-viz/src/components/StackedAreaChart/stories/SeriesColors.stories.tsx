import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../../../components';
import {generateMultipleSeries} from '../../Docs/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const SeriesColorsUpToEight: Story<StackedAreaChartProps> =
  Template.bind({});

SeriesColorsUpToEight.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(4, 'dates'),
};

export const SeriesColorsUpToSixteen = Template.bind({});

SeriesColorsUpToSixteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(14, 'dates'),
};
