import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand, scaleLinear} from 'd3-scale';
import {Color} from 'types';
import {StackSeries} from 'components/MultiSeriesBarChart/types';
import {Bar} from 'components';

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
    onFocus: jest.fn(),
    accessibilityData: [
      {
        title: 'title1',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
      {
        title: 'title2',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
      {
        title: 'title3',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
    ],
  };

  it('renders a <Bar /> for each data item', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} />
      </svg>,
    );

    expect(wrapper).toContainReactComponentTimes(Bar, mockProps.data.length);
  });

  it('renders bar stack with colors from series props', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} />
      </svg>,
    );

    expect(wrapper).toContainReactComponent(Bar, {
      color: 'secondary',
    });
  });

  it('renders bar stack with highlightColors', () => {
    const wrapper = mount(
      <svg>
        <StackedBarGroup {...mockProps} activeBarGroup={1} />
      </svg>,
    );

    expect(wrapper).toContainReactComponent(Bar, {
      highlightColor: 'secondaryProminent',
    });
  });
});
