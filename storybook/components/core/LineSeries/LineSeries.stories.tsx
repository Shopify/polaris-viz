import React from 'react';
import type {Meta, Story} from '@storybook/react/types-6-0';
import {scaleLinear} from 'd3-scale';
import {
  LineSeries,
  LineSeriesProps,
  useSparkLine,
} from '@shopify/polaris-viz-core';

import {XMLNS} from '../../../../packages/polaris-viz/src/constants';

import {DATA_SERIES} from './data';

export default {
  title: 'Shared/Subcomponents/LineSeries',
  component: LineSeries,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component: 'Used to create the series lines in a line chart',
      },
    },
  },
  argTypes: {
    yScale: {
      control: null,
    },
    xScale: {
      control: null,
    },
  },
} as Meta;

const xScale = scaleLinear().range([0, 500]).domain([0, 10]);

const DEFAULT_PROPS: LineSeriesProps = {
  native: false,
  xScale,
  data: DATA_SERIES,
  isAnimated: true,
  svgDimensions: {height: 200, width: 500},
  yScale: scaleLinear(),
  index: 0,
  theme: 'Default',
};

const Template: Story<LineSeriesProps> = (args) => {
  const {minXDomain, maxXDomain, yScale} = useSparkLine({
    data: [DATA_SERIES],
    height: 200,
  });

  const xScale = scaleLinear().range([0, 450]).domain([minXDomain, maxXDomain]);

  return (
    <svg viewBox="0 0 500 500" xmlns={XMLNS} height={500} width={500}>
      <LineSeries {...args} yScale={yScale} xScale={xScale} />
    </svg>
  );
};

export const Default: Story<LineSeriesProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
};

export const isComparison: Story<LineSeriesProps> = Template.bind({});

isComparison.args = {
  ...DEFAULT_PROPS,
  data: {
    isComparison: true,
    ...DATA_SERIES,
  },
};
