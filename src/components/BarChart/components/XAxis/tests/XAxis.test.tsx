import React from 'react';
import {mount} from '@shopify/react-testing';
import {LINE_HEIGHT} from 'components/BarChart/constants';

import {XAxis} from '../XAxis';

describe('<XAxis/>', () => {
  const mockProps = {
    range: [0, 100],
    labels: [
      {value: ['A label', 'that is long'], xOffset: 10},
      {value: ['Label'], xOffset: 20},
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

  it('renders a tspan for each array item within each label', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('tspan', 3);
  });

  it('gives the first tspan a dy of 0', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponent('tspan', {children: 'A label', dy: 0});
  });

  it('gives subsequent tspans a dy of the line height', () => {
    const axis = mount(
      <svg>
        <XAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponent('tspan', {
      children: 'that is long',
      dy: LINE_HEIGHT,
    });
  });
});
