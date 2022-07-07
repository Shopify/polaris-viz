import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {ChartSkeleton, ChartSkeletonProps} from '../';
import {ChartContainer} from '../../ChartContainer';
import {CHART_STATE_CONTROL_ARGS, THEME_CONTROL_ARGS} from '../../../storybook';
import {ChartState, DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

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
    theme: THEME_CONTROL_ARGS,
    type: {
      description: 'Controls what kind of skeleton is displayed',
      control: false,
    },
  },
} as Meta;

const Template: Story<ChartSkeletonProps> = (args: ChartSkeletonProps) => {
  return (
    <ChartContainer theme={DEFAULT_THEME_NAME}>
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

const Donut: Story<ChartSkeletonProps> = (args: ChartSkeletonProps) => {
  return (
    <div style={{width: 400, height: 200}}>
      <ChartContainer theme={args.theme!}>
        <ChartSkeleton {...args} />
      </ChartContainer>
    </div>
  );
};

export const loadingDonut: Story<ChartSkeletonProps> = Donut.bind({});
loadingDonut.args = {
  state: ChartState.Loading,
  type: 'Donut',
};
export const errorDonut: Story<ChartSkeletonProps> = Donut.bind({});
errorDonut.args = {
  state: ChartState.Error,
  type: 'Donut',
};
