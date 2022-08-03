import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {StackedAreas} from '../StackedAreas';
import {Area} from '../../Area';
import type {StackedSeries} from '../../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const mockStackedValues = [
  [
    [163, 269],
    [0, 0],
  ],
  [
    [0, 163],
    [0, 203],
  ],
] as StackedSeries[];

describe('<StackedAreas />', () => {
  const mockProps = {
    transform: '',
    colors: ['red', 'purple'],
    xScale: scaleLinear(),
    yScale: scaleLinear(),
    isAnimated: true,
    stackedValues: mockStackedValues,
    zeroLineValues: mockStackedValues,
  };

  it('renders a <Area /> for each stacked series', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponentTimes(Area, 2);
  });

  it('passes index and animationIndex to <Area />', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    const stacks = stackedArea.findAll(Area);

    expect(stacks[0]).toHaveReactProps({
      animationIndex: 1,
      index: 0,
    });

    expect(stacks[1]).toHaveReactProps({
      animationIndex: 0,
      index: 1,
    });
  });

  describe('stackedValues', () => {
    it('passes SLOW_DURATION to <Area /> .length is less than 10', () => {
      const stackedArea = mount(
        <svg>
          <StackedAreas {...mockProps} />
        </svg>,
      );

      const stacks = stackedArea.findAll(Area);

      expect(stacks[0]).toHaveReactProps({
        duration: 275,
      });
    });

    it('passes FAST_DURATION to <Area /> .length is greater than 10', () => {
      const mockValues = new Array(11).fill([
        [163, 269],
        [0, 0],
      ]);
      const stackedArea = mount(
        <svg>
          <StackedAreas
            {...mockProps}
            stackedValues={mockValues}
            zeroLineValues={mockValues}
          />
        </svg>,
      );

      const stacks = stackedArea.findAll(Area);

      expect(stacks[0]).toHaveReactProps({
        duration: 100,
      });
    });
  });
});
