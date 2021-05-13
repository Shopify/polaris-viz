import React from 'react';
import {mount} from '@shopify/react-testing';
import {line} from 'd3-shape';

import {useLineChartAnimations} from '../use-line-chart-animations';
import {SeriesWithDefaults} from '../../types';
import {getPointAtLength} from '../../../../utilities';

jest.mock('../../../../utilities', () => {
  return {
    ...jest.requireActual('../../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: jest.fn(() => ({x: 0, y: 0})),
  };
});

const lineGeneratorMock = jest.fn(
  line<{rawValue: number}>()
    .x((_, index) => index)
    .y(({rawValue}) => rawValue),
) as any;

const series: SeriesWithDefaults[] = [
  {
    name: 'Primary',
    color: 'primary',
    lineStyle: 'solid',
    data: [
      {label: 'Jan 1', rawValue: 1500},
      {label: 'Jan 2', rawValue: 1000},
      {label: 'Jan 3', rawValue: 800},
      {label: 'Jan 4', rawValue: 1300},
      {label: 'Jan 1', rawValue: 1500},
      {label: 'Jan 2', rawValue: 1000},
      {label: 'Jan 3', rawValue: 800},
      {label: 'Jan 4', rawValue: 1300},
    ],
  },
];

const mockProps = {
  activeIndex: 0,
  lineGenerator: lineGeneratorMock,
  series,
  isAnimated: true,
};

describe('useLineChartAnimations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns value if isAnimated is true', () => {
    let animatedCoordinates: any[] | null;

    function TestComponent() {
      animatedCoordinates = useLineChartAnimations({
        ...mockProps,
        isAnimated: true,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    expect(animatedCoordinates![0].getValue()).toMatchObject({x: 0, y: 0});
  });

  it('returns null if isAnimated is false', () => {
    let animatedCoordinates;

    function TestComponent() {
      animatedCoordinates = useLineChartAnimations({
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
      animatedCoordinates = useLineChartAnimations({
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
      useLineChartAnimations({
        ...mockProps,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(lineGeneratorMock).toHaveBeenCalledTimes(2);
  });

  it('does not call lineGenerator if isAnimated is false', () => {
    function TestComponent() {
      useLineChartAnimations({
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
      useLineChartAnimations({
        ...mockProps,
        series: [],
      });

      return null;
    }

    mount(<TestComponent />);

    expect(lineGeneratorMock).not.toHaveBeenCalled();
  });

  it('does not call lineGenerator if activeIndex is null', () => {
    function TestComponent() {
      useLineChartAnimations({
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
      animatedCoordinates = useLineChartAnimations({
        ...mockProps,
        series: [
          {
            ...series[0],
            data: [{label: 'Jan 1', rawValue: 1500}],
          },
        ],
        isAnimated: true,
      }).animatedCoordinates;

      return null;
    }

    mount(<TestComponent />);

    animatedCoordinates![0].getValue();

    expect(getPointAtLength).toHaveBeenCalledWith(expect.any(SVGElement), 0);
  });
});
