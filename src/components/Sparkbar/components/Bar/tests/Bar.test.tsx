import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {Bar} from '../Bar';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => jest.fn((value) => value)),
}));

const width = 100;
const controlPointY = width * 0.2;
const curveHeight = controlPointY * 3;

describe('<Bar/>', () => {
  it('renders a path', () => {
    const bar = mount(
      <svg>
        <Bar
          height={100}
          x={0}
          rawValue={1000}
          width={width}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `M 0 ${curveHeight} C 0 -${controlPointY} ${width} -${controlPointY} ${width} ${curveHeight} L 100 100 L 0 100 Z`,
      style: {transform: 'translate(0px, -100px) rotate(0deg)'},
    });
  });

  it('d attibute is presewnt if the height is at least the curve height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={curveHeight}
          x={0}
          rawValue={1}
          width={width}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `M 0 ${curveHeight} C 0 -${controlPointY} ${width} -${controlPointY} ${width} ${curveHeight} L 100 60 L 0 60 Z`,
      style: {transform: `translate(0px, -60px) rotate(0deg)`},
    });
  });

  it('d attribute is empty if the height is lower than the curve height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={1}
          x={0}
          rawValue={1}
          width={width}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: '',
      style: {transform: `translate(0px, -1px) rotate(0deg)`},
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
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: ``,
      style: {transform: `translate(0px, 0px) rotate(0deg)`},
    });
  });
});
