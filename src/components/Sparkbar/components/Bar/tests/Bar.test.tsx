import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {Bar} from '../Bar';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => jest.fn((value) => value)),
}));

describe('<Bar/>', () => {
  it('renders a path', () => {
    const bar = mount(
      <svg>
        <Bar
          height={100}
          x={0}
          rawValue={1000}
          width={100}
          yScale={scaleBand() as any}
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M 0 50 A 50 50 0 0 1 100 50 M 100 50 L 100 100 L 0 100 L 0 50',
      style: {transform: 'translate(0px, -100px) rotate(0deg)'},
    });
  });

  it('d attibute is present if the height is shorter than the arc height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={49}
          x={0}
          rawValue={1}
          width={100}
          yScale={scaleBand() as any}
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `M 1 49 A 50 50 0 0 1 99 49 M 100 49 L 0 49`,
      style: {transform: `translate(0px, -49px) rotate(0deg)`},
    });
  });

  it('gives a 0 value an empty path d attribute and 0 height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={0}
          x={0}
          rawValue={0}
          width={100}
          yScale={scaleBand() as any}
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: ``,
      style: {transform: `translate(0px, 0px) rotate(0deg)`},
    });
  });
});
