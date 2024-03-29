import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {ComponentNameProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<ComponentNameProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
};
