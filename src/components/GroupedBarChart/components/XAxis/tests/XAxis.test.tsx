import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {XAxis} from '../XAxis';

jest.mock('d3-scale', () => ({
  scaleBand: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];
    scale.range = () => [0, 2];

    return scale;
  },
}));

describe('<XAxis/>', () => {
  const mockProps = {
    range: [0, 100],
    xScale: scaleBand(),
    showFewerLabels: false,
    needsDiagonalLabels: false,
    fontSize: 12,
    labels: [
      {value: 'A label that is long', xOffset: 10},
      {value: 'Label', xOffset: 20},
    ],
  };

  it('renders a path', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponent('path', {
      fill: 'none',
      stroke: 'rgb(223, 227, 232)',
    });
  });

  it('renders a line for each label value', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('line', 2);
  });

  it('renders a text element for each label value', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('text', 2);
  });

  it('hides alternating elements if showFewerLabels is true', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} showFewerLabels />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('text', 1);
  });

  it('displays text horizontally by default', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    const text = axis.find('text');
    expect(text!.props.textAnchor).toBe('middle');
    expect(text!.props.transform).toBe('translate(0 24)');
  });

  it('displays text diagonally if needsDiagonalLabels is true', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} needsDiagonalLabels />,
      </svg>,
    );

    const text = axis.find('text');
    expect(text!.props.textAnchor).toBe('end');
    expect(text!.props.transform).toBe('translate(4 20) rotate(-40)');
  });
});
