/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import {mount} from '@shopify/react-testing';
import {line} from 'd3-shape';
import {
  ChartContext,
  LineChartDataSeriesWithDefaults,
} from '@shopify/polaris-viz-core';

import {useLinearChartAnimations} from '../useLinearChartAnimations';
import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';

jest.mock('../../utilities/getPathLength', () => {
  return {
    getPathLength: () => 0,
  };
});

jest.mock('../../utilities/getPointAtLength', () => {
  return {
    getPointAtLength: jest.fn(() => ({x: 0, y: 0})),
  };
});

const lineGeneratorMock = jest.fn(
  line<{value: number}>()
    .x((_, index) => index)
    .y(({value}) => value),
) as any;

const data: LineChartDataSeriesWithDefaults[] = [
  {
    name: 'Primary',
    color: 'primary',
    data: [
      {key: 'Jan 1', value: 1500},
      {key: 'Jan 2', value: 1000},
      {key: 'Jan 3', value: 800},
      {key: 'Jan 4', value: 1300},
      {key: 'Jan 1', value: 1500},
      {key: 'Jan 2', value: 1000},
      {key: 'Jan 3', value: 800},
      {key: 'Jan 4', value: 1300},
    ],
  },
];

const mockProps = {
  activeIndex: 0,
  lineGenerator: lineGeneratorMock,
  data,
  isAnimated: true,
};

describe('useLinearChartAnimations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns value if isAnimated is true', () => {
    let animatedCoordinates: any[] | null;

    function TestComponent() {
      animatedCoordinates = useLinearChartAnimations({
        ...mockProps,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    expect(animatedCoordinates![0].get()).toMatchObject({x: 0, y: 0});
  });

  it('returns null if the activeIndex is null', () => {
    let animatedCoordinates;

    function TestComponent() {
      animatedCoordinates = useLinearChartAnimations({
        ...mockProps,
        activeIndex: null,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    expect(animatedCoordinates).toBeNull();
  });

  it('calls line generator twice per series', () => {
    function TestComponent() {
      useLinearChartAnimations({
        ...mockProps,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(lineGeneratorMock).toHaveBeenCalledTimes(2);
  });

  it('does not call lineGenerator if isAnimated is false', () => {
    function TestComponent() {
      useLinearChartAnimations({
        ...mockProps,
      });

      return null;
    }

    mount(
      <ChartContext.Provider
        value={{
          characterWidths,
          characterWidthOffsets,
          shouldAnimate: false,
        }}
      >
        <TestComponent />
      </ChartContext.Provider>,
    );

    expect(lineGeneratorMock).not.toHaveBeenCalled();
  });

  it('does not call lineGenerator is there are no series', () => {
    function TestComponent() {
      useLinearChartAnimations({
        ...mockProps,
        data: [],
      });

      return null;
    }

    mount(<TestComponent />);

    expect(lineGeneratorMock).not.toHaveBeenCalled();
  });

  it('does not call lineGenerator if activeIndex is null', () => {
    function TestComponent() {
      useLinearChartAnimations({
        ...mockProps,
        activeIndex: null,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(lineGeneratorMock).not.toHaveBeenCalled();
  });
});
