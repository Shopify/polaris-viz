import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {LineChartProps} from '../LineChart';

import {Template} from './data';

export const SeriesColorsUpToSixteen: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(16, 'dates'),
};
