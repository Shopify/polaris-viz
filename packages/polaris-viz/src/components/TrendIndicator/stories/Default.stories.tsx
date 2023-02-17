import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TrendIndicatorProps} from '..';

import {Template} from './data';

export const Default: Story<TrendIndicatorProps> = Template.bind({});

Default.args = {
  accessibilityLabel: 'Increase of 10%',
  theme: 'Light',
  value: '10%',
};
