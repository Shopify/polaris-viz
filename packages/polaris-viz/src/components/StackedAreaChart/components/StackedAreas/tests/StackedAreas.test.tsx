import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import React from 'react';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {StackedAreas} from '../StackedAreas';
import {AnimatedArea} from '../../Area/AnimatedArea';
import {Area} from '../../Area/Area';
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
    theme: DEFAULT_THEME_NAME,
  };

  it('renders a <AnimatedArea /> for each stacked series', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponentTimes(AnimatedArea, 2);
  });

  it('passes index and animationIndex to <Area />', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    const stacks = stackedArea.findAll(AnimatedArea);

    expect(stacks[0]).toHaveReactProps({
      animationIndex: 0,
      index: 0,
    });

    expect(stacks[1]).toHaveReactProps({
      animationIndex: 1,
      index: 1,
    });
  });

  describe('stackedValues', () => {
    it('passes SLOW_DURATION to <AnimatedArea /> .length is less than 10', () => {
      const stackedArea = mount(
        <svg>
          <StackedAreas {...mockProps} />
        </svg>,
      );

      const stacks = stackedArea.findAll(AnimatedArea);

      expect(stacks[0]).toHaveReactProps({
        duration: 275,
      });
    });

    it('passes FAST_DURATION to <AnimatedArea /> .length is greater than 10', () => {
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

      const stacks = stackedArea.findAll(AnimatedArea);

      expect(stacks[0]).toHaveReactProps({
        duration: 100,
      });
    });

    it('renders and animates when series length changes', () => {
      const singleSeriesValues = [
        [
          [163, 269],
          [0, 0],
        ],
      ] as StackedSeries[];

      const stackedArea = mount(
        <svg>
          <StackedAreas
            {...mockProps}
            stackedValues={singleSeriesValues}
            zeroLineValues={singleSeriesValues}
          />
        </svg>,
      );

      expect(stackedArea).toContainReactComponentTimes(AnimatedArea, 1);

      // Update with two series
      stackedArea.setProps({
        children: (
          <StackedAreas
            {...mockProps}
            stackedValues={mockStackedValues}
            zeroLineValues={mockStackedValues}
          />
        ),
      });

      const stacks = stackedArea.findAll(AnimatedArea);

      expect(stackedArea).toContainReactComponentTimes(AnimatedArea, 2);
      expect(stacks[0]).toHaveReactProps({
        duration: 275,
      });
      expect(stacks[1]).toHaveReactProps({
        duration: 275,
      });
    });
  });
});
