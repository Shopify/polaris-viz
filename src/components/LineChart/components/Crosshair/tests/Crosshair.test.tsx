import React from 'react';
import {mount} from '@shopify/react-testing';

import {Crosshair} from '../Crosshair';

const mockDOMRect = {
  height: 100,
  width: 100,
} as DOMRect;

describe('<Crosshair />', () => {
  it('renders a rect centered on the given x', () => {
    const crosshair = mount(
      <svg>
        <Crosshair x={50} dimensions={mockDOMRect} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {x: 47.5});
  });

  it('renders a rect with height equal to the non-margin portion of the chart', () => {
    const crosshair = mount(
      <svg>
        <Crosshair x={50} dimensions={mockDOMRect} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {height: 55});
  });
});
