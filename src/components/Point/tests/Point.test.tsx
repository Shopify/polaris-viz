import React from 'react';
import {mount} from '@shopify/react-testing';
import type {Color} from 'types';

import {Point} from '../Point';

const mockProps = {
  cx: 100,
  cy: 100,
  active: false,
  color: 'colorPurple' as Color,
};

describe('<Point />', () => {
  it('renders a circle at the given coordinates', () => {
    const point = mount(
      <svg>
        <Point {...mockProps} />
      </svg>,
    );

    expect(point).toContainReactComponent('circle', {
      cx: 100,
      cy: 100,
    });
  });

  it('renders with a radius of 5 when active', () => {
    const point = mount(
      <svg>
        <Point {...mockProps} active />
      </svg>,
    );

    expect(point).toContainReactComponent('circle', {
      // eslint-disable-next-line id-length
      r: 5,
    });
  });

  it('renders with a radius of 5 when not active', () => {
    const point = mount(
      <svg>
        <Point {...mockProps} active={false} />
      </svg>,
    );

    expect(point).toContainReactComponent('circle', {
      // eslint-disable-next-line id-length
      r: 0,
    });
  });
});
