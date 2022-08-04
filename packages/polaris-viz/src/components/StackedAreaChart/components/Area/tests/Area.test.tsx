import React from 'react';
import {mount} from '@shopify/react-testing';
import {area, line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {mountWithProvider} from '../../../../../test-utilities';
import {mockDefaultTheme} from '../../../../../test-utilities/mountWithProvider';
import {Area, AreaProps} from '../Area';
import {DEFAULT_THEME} from '../../../../../constants';
import type {StackedSeries, Theme} from '../../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

describe('<Area />', () => {
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
    isImmediate: false,
    lineGenerator,
    selectedTheme: DEFAULT_THEME,
  };

  it('renders a path for each series', () => {
    const stackedArea = mount(
      <svg>
        <Area {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponentTimes('path', 2);
  });

  it('renders stroke width based on theme', () => {
    const {themes} = mockDefaultTheme({line: {width: 10}});
    const stackedArea = mountWithProvider(
      <svg>
        <Area {...mockProps} selectedTheme={themes.Default as Theme} />
      </svg>,
    );

    const paths = stackedArea.findAll('path');

    expect(paths[0]).toHaveReactProps({
      strokeWidth: 10,
    });
  });

  it('renders correctly when line.hasSpline is false', () => {
    const stackedArea = mountWithProvider(
      <svg>
        <Area {...mockProps} />
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
    const line = 'M0,269L1,0';
    const area = 'M0,269L1,0L1,0L0,163Z';

    const stackedArea = mount(
      <svg>
        <Area {...mockProps} />
      </svg>,
    );

    const paths = stackedArea.findAll('path');

    // Line
    expect(paths[0]).toHaveReactProps({
      // eslint-disable-next-line id-length
      d: line,
      fill: 'none',
      stroke: 'url(#area-stackedAreas-1-0)',
      strokeWidth: 2,
    });
    // Area
    expect(paths[1]).toHaveReactProps({
      // eslint-disable-next-line id-length
      d: area,
      fill: 'url(#area-stackedAreas-1-0)',
      style: {opacity: 0},
    });
  });
});
