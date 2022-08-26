import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<TooltipContentProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  title: 'Tuesday',
};
