import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../../../components';
import {generateMultipleSeries} from '../../Docs/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const SeriesColorsUpToFour: Story<StackedAreaChartProps> = Template.bind(
  {},
);

SeriesColorsUpToFour.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(4, 'dates'),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(7, 'dates'),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(14, 'dates'),
};
