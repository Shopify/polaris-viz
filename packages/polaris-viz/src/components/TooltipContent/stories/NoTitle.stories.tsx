import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const NoTitle: Story<TooltipContentProps> = Template.bind({});

NoTitle.args = {
  data: DEFAULT_DATA,
};
