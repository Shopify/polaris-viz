import React from 'react';
import {mount} from '@shopify/react-testing';

import {Crosshair} from '../Crosshair';

describe('<Crosshair />', () => {
  it('renders a rect centered on the given x', () => {
    const crosshair = mount(
      <svg>
        <Crosshair isAnimated={false} x={50} height={500} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {x: 47.5});
  });

  it('renders a rect with the given height', () => {
    const crosshair = mount(
      <svg>
        <Crosshair isAnimated={false} x={50} height={500} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {height: 500});
  });

  it('gives the rect full opacity by default', () => {
    const crosshair = mount(
      <svg>
        <Crosshair isAnimated={false} x={50} height={500} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {style: {opacity: 1}});
  });

  it('applies opacity from props to the rect', () => {
    const crosshair = mount(
      <svg>
        <Crosshair isAnimated={false} x={50} height={500} opacity={0.8} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {style: {opacity: 0.8}});
  });
});
