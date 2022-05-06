import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {ChartSkeleton, ChartSkeletonProps} from '../';
import {ChartContainer} from '../../ChartContainer';

export default {
  title: 'polaris-viz/Subcomponents/ChartSkeleton',
  component: ChartSkeleton,
  decorators: [(Story: any) => <div style={{height: '500px'}}>{Story()}</div>],
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component: 'Used to display loading and error states of charts.',
      },
    },
  },
  argTypes: {},
} as Meta;

const Template: Story<ChartSkeletonProps> = (args: ChartSkeletonProps) => {
  return (
    <ChartContainer>
      <ChartSkeleton {...args} />
    </ChartContainer>
  );
};

export const loading: Story<ChartSkeletonProps> = Template.bind({});
loading.args = {
  state: 'loading',
  dimensions: {
    width: 1000,
    height: 400,
  },
};

export const error: Story<ChartSkeletonProps> = Template.bind({});
error.args = {
  state: 'error',
  dimensions: {
    width: 1000,
    height: 400,
  },
};
