import React from 'react';
import type {Meta, Story} from '@storybook/react/types-6-0';
import {scaleLinear} from 'd3-scale';

import {LineSeries, LineSeriesProps} from '../LineSeries';
import {XMLNS} from '../../../constants';
import {useSparkLine} from '../../..';

export default {
  title: 'Essentials/Subcomponents/LineSeries',
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

const dataSeries = {
  color: [
    {
      offset: 0,
      color: '#7f4afa',
    },
    {
      offset: 85,
      color: '#3672bb',
    },
    {
      offset: 100,
      color: '#4b92e5',
    },
  ],
  data: [
    {
      key: 0,
      value: 100,
    },
    {
      key: 1,
      value: 200,
    },
    {
      key: 2,
      value: 300,
    },
    {
      key: 3,
      value: 400,
    },
    {
      key: 4,
      value: 400,
    },
    {
      key: 5,
      value: 1000,
    },
    {
      key: 6,
      value: 200,
    },
    {
      key: 7,
      value: 800,
    },
    {
      key: 8,
      value: 900,
    },
    {
      key: 9,
      value: 200,
    },
    {
      key: 10,
      value: 400,
    },
  ],
};

const props = {
  native: false,
  xScale: xScale,
  data: dataSeries,
  isAnimated: true,
  svgDimensions: {height: 200, width: 500},
};

const Template: Story<LineSeriesProps> = (args) => {
  const {minXDomain, maxXDomain, yScale} = useSparkLine({
    data: [dataSeries],
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
  ...props,
};

export const isComparison: Story<LineSeriesProps> = Template.bind({});

isComparison.args = {
  ...props,
  data: {
    isComparison: true,
    ...dataSeries,
  },
};
