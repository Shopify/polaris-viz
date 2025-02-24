import {mount} from '@shopify/react-testing';
import {area, line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import React from 'react';

import {
  mockDefaultTheme,
  mountWithProvider,
} from '../../../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {DARK_THEME} from '../../../../../constants';
import type {StackedSeries} from '../../../../../types';
import type {AreaProps} from '../types';
import {AnimatedArea} from '../AnimatedArea';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

describe('<AnimatedArea />', () => {
  const xScale = scaleLinear();
  const yScale = scaleLinear();

  const areaGenerator = area<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y0(([firstPoint]) => yScale(firstPoint))
    .y1(([, lastPoint]) => yScale(lastPoint));

  const lineGenerator = line<number[]>()
    .defined(
      ([firstPoint, lastPoint]) => !isNaN(firstPoint) && !isNaN(lastPoint),
    )
    .x((_, index) => xScale(index))
    .y(([, lastPoint]) => yScale(lastPoint));

  const mockValues = [
    [163, 269],
    [0, 0],
  ] as StackedSeries;
  const mockProps: AreaProps = {
    activeLineIndex: -1,
    animationIndex: 1,
    areaGenerator,
    colors: ['red', 'green'],
    data: mockValues,
    zeroLineValues: mockValues,
    duration: 300,
    id: 'stackedAreas-1',
    index: 0,
    lineGenerator,
    tooltipAreas: <React.Fragment />,
    selectedTheme: DARK_THEME,
  };

  it('renders an area and a path for each series', () => {
    const stackedArea = mount(
      <svg>
        <AnimatedArea {...mockProps} />
      </svg>,
    );

    // We check for 3 because the area is rendered twice. Once to the visible area
    // and once for the clipPath.
    expect(stackedArea).toContainReactComponentTimes('path', 3);
  });

  it('renders stroke width based on theme', () => {
    const {themes} = mockDefaultTheme({line: {width: 10}});

    const stackedArea = mountWithProvider(
      <svg>
        <AnimatedArea {...mockProps} selectedTheme={themes.Light} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponent('path', {
      strokeWidth: 10,
    });
  });

  it('renders correctly when line.hasSpline is false', () => {
    const stackedArea = mountWithProvider(
      <svg>
        <AnimatedArea {...mockProps} />
      </svg>,
      mockDefaultTheme({line: {hasSpline: false}}),
    );

    // Line
    expect(stackedArea).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M0,269L1,0',
    });
  });

  it('generates props for the paths', () => {
    const stackedArea = mount(
      <svg>
        <AnimatedArea {...mockProps} />
      </svg>,
    );

    // Line
    expect(stackedArea).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M0,269L1,0',
      fill: 'none',
      stroke: 'url(#area-stackedAreas-1-0)',
      strokeWidth: 2,
    });
    // Area
    expect(stackedArea).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M0,269L1,0L1,0L0,163Z',
      fill: 'url(#area-stackedAreas-1-0)',
    });
  });
});
