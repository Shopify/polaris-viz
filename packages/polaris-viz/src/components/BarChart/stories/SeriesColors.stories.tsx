export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';

import {Template} from './data';

export const SeriesColorsUpToSixteen = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(16),
};
