import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LegendProps} from '../../../components';

import {Template} from './data';

export const Default: Story<LegendProps> = Template.bind({});

Default.args = {
  data: [
    {
      name: 'Direct',
      color: 'green',
      value: '$200',
    },
    {
      name: 'Facebook',
      color: 'blue',
      shape: 'Line',
    },
    {
      name: 'Twitter',
      color: 'red',
      shape: 'Line',
      isComparison: true,
      value: '$100',
    },
  ],
};
