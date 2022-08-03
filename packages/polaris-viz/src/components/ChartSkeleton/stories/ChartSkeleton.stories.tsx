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
    <div
      style={{
        width: 700,
        height: 400,
      }}
    >
      <ChartContainer data={[]} isAnimated={true} theme={DEFAULT_THEME_NAME}>
        <ChartSkeleton {...args} />
      </ChartContainer>
    </div>
  );
};

export const loading: Story<ChartSkeletonProps> = Template.bind({});
loading.args = {
  state: ChartState.Loading,
};

export const error: Story<ChartSkeletonProps> = Template.bind({});
error.args = {
  state: ChartState.Error,
};

export const loadingFunnel: Story<ChartSkeletonProps> = Template.bind({});
loadingFunnel.args = {
  state: ChartState.Loading,
  type: 'Funnel',
};
export const errorFunnel: Story<ChartSkeletonProps> = Template.bind({});
errorFunnel.args = {
  state: ChartState.Error,
  type: 'Funnel',
};

const Donut: Story<ChartSkeletonProps> = (args: ChartSkeletonProps) => {
  return (
    <div style={{width: 400, height: 200}}>
      <ChartContainer data={[]} isAnimated={true} theme={DEFAULT_THEME_NAME}>
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
