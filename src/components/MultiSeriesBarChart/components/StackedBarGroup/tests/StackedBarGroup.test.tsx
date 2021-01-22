import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {Color} from 'types';
import type {StackSeries} from 'components/MultiSeriesBarChart/types';

import {StackedBarGroup} from '../StackedBarGroup';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn((value) => value)),
  scaleBand: jest.fn(() => {
    const scale = (value: any) => value;
    scale.bandwidth = () => 500;
    return scale;
  }),
}));

describe('<StackedBarGroup/>', () => {
  const stackedValues = [
    [0, 1],
    [0, 2],
    [0, 3],
  ] as StackSeries;

  const mockProps = {
    groupIndex: 1,
    data: stackedValues,
    yScale: scaleLinear() as any,
    xScale: scaleBand() as any,
    colors: ['primary', 'secondary'] as Color[],
    highlightColors: ['primaryProminent', 'secondaryProminent'] as Color[],
    activeBarGroup: null,
  };

  it('renders a rect for each data item', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} />
      </svg>,
    );

    expect(wrapper).toContainReactComponentTimes('rect', mockProps.data.length);
  });

  it('renders bar stack with colors from series props', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} />
      </svg>,
    );

    expect(wrapper).toContainReactComponent('rect', {
      fill: 'rgb(41,35,112)',
    });
  });

  it('renders bar stack with highlightColors from series prop when it is the activeBarGroup', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} activeBarGroup={1} />
      </svg>,
    );

    expect(wrapper).toContainReactComponent('rect', {
      fill: 'rgb(9, 6, 37)',
    });
  });

  it('renders a bar with height', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} />
      </svg>,
    );

    const rects = wrapper.findAll('rect');
    const firstRect = rects[0];

    expect(firstRect).toHaveReactProps({
      height: 1,
    });
  });
});
