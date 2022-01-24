import React from 'react';
import {mount} from '@shopify/react-testing';
import {line} from 'd3-shape';
import type {DataWithDefaults} from 'components/LineChart/types';

import {useLinearChartAnimations} from '../use-linear-chart-animations';
import {getPointAtLength} from '../../utilities';

jest.mock('../../utilities', () => {
  return {
    ...jest.requireActual('../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: jest.fn(() => ({x: 0, y: 0})),
  };
});

const lineGeneratorMock = jest.fn(
  line<{value: number}>()
    .x((_, index) => index)
    .y(({value}) => value),
) as any;

const data: DataWithDefaults[] = [
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
    lineStyle: 'solid',
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
        isAnimated: true,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    expect(animatedCoordinates![0].get()).toMatchObject({x: 0, y: 0});
  });

  it('returns null if isAnimated is false', () => {
    let animatedCoordinates;

    function TestComponent() {
      animatedCoordinates = useLinearChartAnimations({
        ...mockProps,
        isAnimated: false,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    expect(animatedCoordinates).toBeNull();
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
        isAnimated: false,
      });

      return null;
    }

    mount(<TestComponent />);

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

  it('calls getPointAtLength with a length of 0 if there is only one point in the series', () => {
    let animatedCoordinates: any[] | null;

    function TestComponent() {
      animatedCoordinates = useLinearChartAnimations({
        ...mockProps,
        data: [
          {
            ...data[0],
            data: [{key: 'Jan 1', value: 1500}],
          },
        ],
        isAnimated: true,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    animatedCoordinates![0].get();

    expect(getPointAtLength).toHaveBeenCalledWith(expect.any(SVGElement), 0);
  });
});
