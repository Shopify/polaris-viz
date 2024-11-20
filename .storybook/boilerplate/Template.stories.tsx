import type {StoryFn} from '@storybook/react';
import {META} from './meta';
import type {ComponentNameProps} from '../../../components';
import {DEFAULT_DATA, Template} from './data';
export const Default: StoryFn<ComponentNameProps> = Template.bind({});
Default.args = {
  data: DEFAULT_DATA,
};

export default META;