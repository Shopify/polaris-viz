import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {mountWithProvider} from '../../../test-utilities';
import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {LinearXAxis} from '../LinearXAxis';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const mockProps = {
  xScale: scaleLinear(),
  labels: ['Test label 1', 'Test label 2', 'Test label 3'],
  drawableWidth: 150,
  fontSize: 12,
  drawableHeight: 55,
  xAxisDetails: {
    maxXLabelHeight: 200,
    maxDiagonalLabelLength: 10,
    needsDiagonalLabels: true,
    ticks: [0, 1, 2],
    horizontalLabelWidth: 30,
  },
  ariaHidden: false,
};

describe('<LinearXAxis />', () => {
  it('renders a small, outer tick for each tick', () => {
    const axis = mountWithProvider(
      <svg>
        <LinearXAxis {...mockProps} />
      </svg>,
      mockDefaultTheme({
        xAxis: {showTicks: true},
      }),
    );

    expect(axis).toContainReactComponentTimes('line', 3, {y2: 6});
  });

  it('renders a vertical gridline for each tick using drawableHeight', () => {
    const axis = mountWithProvider(
      <svg>
        <LinearXAxis {...mockProps} />
      </svg>,
      mockDefaultTheme({
        grid: {showVerticalLines: true},
      }),
    );

    expect(axis).toContainReactComponentTimes('line', 3, {y1: '0', y2: -55});
  });

  it('renders a label for each tick', () => {
    const axis = mount(
      <svg>
        <LinearXAxis {...mockProps} />
      </svg>,
    );

    const text = axis.findAll('div')!;
    const textContent = text.map((node) => node.prop('children'));

    expect(textContent).toStrictEqual(mockProps.labels);
  });

  it('does not render any labels if the labels prop is empty', () => {
    const axis = mount(
      <svg>
        <LinearXAxis {...mockProps} labels={[]} />
      </svg>,
    );

    expect(axis.text()).toBe('');
  });
});
