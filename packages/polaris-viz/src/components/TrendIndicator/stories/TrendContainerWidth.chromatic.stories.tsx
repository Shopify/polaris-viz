import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Subcomponents/TrendIndicator',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {TrendIndicator} from '../TrendIndicator';
import type {TrendIndicatorProps} from '../TrendIndicator';

import {META} from './meta';

export const Template: Story<TrendIndicatorProps> = (
  args: TrendIndicatorProps,
) => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{background: 'red'}}>
        <TrendIndicator {...args} />
      </div>
    </div>
  );
};

export const Default: Story<TrendIndicatorProps> = Template.bind({});

Default.args = {
  accessibilityLabel: 'Increase of 10%',
  theme: 'Light',
  value: '10%',
};
