export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const SeriesColorsUpToSixteen = Template.bind({});

SeriesColorsUpToSixteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(14, 'dates'),
};
