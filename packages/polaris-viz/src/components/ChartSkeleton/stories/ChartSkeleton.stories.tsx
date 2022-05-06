import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {ChartSkeleton, ChartSkeletonProps} from '../';
import {ChartContainer} from '../../ChartContainer';
import {CHART_STATE_CONTROL_ARGS} from '../../../storybook';
import {ChartState} from '@shopify/polaris-viz-core';

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
  argTypes: {
    state: CHART_STATE_CONTROL_ARGS,
  },
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
  state: ChartState.Loading,
  dimensions: {
    width: 1000,
    height: 400,
  },
};

export const error: Story<ChartSkeletonProps> = Template.bind({});
error.args = {
  state: ChartState.Error,
  dimensions: {
    width: 1000,
    height: 400,
  },
};
