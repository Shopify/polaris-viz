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
    scale.bandwidth = () => 10;

    return scale;
  },
}));

describe('<XAxis/>', () => {
  const mockProps = {
    range: [0, 100],
    fontSize: 10,
    labels: [
      {value: 'A label that is long', xOffset: 10},
      {value: 'Label', xOffset: 20},
    ],
    xScale: scaleBand(),
    showFewerLabels: false,
    xAxisDetails: {
      needsDiagonalLabels: false,
      maxXLabelHeight: 40,
      maxDiagonalLabelLength: 100,
    },
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

  it('renders a foreignObject for each label value', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('foreignObject', 2);
  });

  it('hides elements if showFewerLabels is true and there is not enough room', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} showFewerLabels />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('foreignObject', 1);
  });

  it('displays text horizontally by default', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    const foreignObjectTransform = axis.find('foreignObject')!.props.transform;
    expect(foreignObjectTransform).not.toContain('rotate');
  });

  it('displays text diagonally if needsDiagonalLabels is true', () => {
    const axis = mount(
      <svg>
        <XAxis
          {...mockProps}
          xAxisDetails={{...mockProps.xAxisDetails, needsDiagonalLabels: true}}
        />
        ,
      </svg>,
    );

    const foreignObjectTransform = axis.find('foreignObject')!.props.transform;
    expect(foreignObjectTransform).toContain('rotate');
  });
});
