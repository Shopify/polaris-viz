export {META as default} from './meta';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const HorizontalBottomRightLabel = Template.bind({});

HorizontalBottomRightLabel.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  legendPosition: 'bottom-right',
};
