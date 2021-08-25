import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {StackedAreas} from '../StackedAreas';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn(() => 250)),
}));

jest.mock('utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'stackedAreas-1'),
}));

describe('<StackedAreas />', () => {
  const mockProps = {
    width: 100,
    height: 50,
    transform: '',
    colors: ['red', 'purple'],
    xScale: scaleLinear(),
    yScale: scaleLinear(),
    isAnimated: true,
    stackedValues: [
      [
        [163, 269],
        [0, 0],
      ],
      [
        [0, 163],
        [0, 203],
      ],
    ] as any,
  };

  it('renders a clipPath with an ID', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponent('clipPath', {
      id: 'stackedAreas-1',
    });
  });

  it('renders a rect within the clipPath', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea.find('clipPath')).toContainReactComponent('rect');
  });

  it('renders a group referencing the clipPath', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponent('g', {
      clipPath: 'url(#stackedAreas-1)',
    });
  });

  it('renders a path for each stacked value', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponentTimes(
      'path',
      mockProps.stackedValues.length,
    );
  });

  it('generates props for the paths', () => {
    const stackedArea = mount(
      <svg>
        <StackedAreas {...mockProps} />
      </svg>,
    );

    expect(stackedArea).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M250,250L250,250L250,250L250,250Z',
      fill: 'url(#area-stackedAreas-1-0)',
      stroke: 'url(#area-stackedAreas-1-0)',
      strokeWidth: '0.1',
    });
  });
});
