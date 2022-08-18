export {META as default} from './meta';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const VerticalSmall = Template.bind({});

VerticalSmall.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  direction: 'vertical',
  size: 'small',
};
