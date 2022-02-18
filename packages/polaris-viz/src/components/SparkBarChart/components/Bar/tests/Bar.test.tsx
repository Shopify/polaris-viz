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
          value={1000}
          width={100}
          yScale={scaleBand() as any}
          fill="red"
          hasRoundedCorners
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M 0 50 A 50 50 0 0 1 100 50 M 100 50 L 100 100 L 0 100 L 0 50',
      style: {transform: ' translate(0px, -100px) rotate(0deg)'},
    });
  });

  it('d attibute is present if the height is shorter than the arc height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={49}
          x={0}
          value={1}
          width={100}
          yScale={scaleBand() as any}
          fill="red"
          hasRoundedCorners
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `M 1 49 A 50 50 0 0 1 99 49 M 100 49 L 0 49`,
      style: {transform: ` translate(0px, -49px) rotate(0deg)`},
    });
  });

  it('gives a 0 value an empty path d attribute and 0 height', () => {
    const bar = mount(
      <svg>
        <Bar
          height={0}
          x={0}
          value={0}
          width={100}
          yScale={scaleBand() as any}
          fill="red"
          hasRoundedCorners
        />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: ``,
      style: {transform: ` translate(0px, 0px) rotate(0deg)`},
    });
  });

  it('renders null if the value is null', () => {
    const wrapper = mount(
      <Bar
        value={null}
        x={0}
        yScale={scaleBand() as any}
        width={10}
        height={0}
        fill="red"
        hasRoundedCorners
      />,
    );

    expect(wrapper.children).toHaveLength(0);
  });

  describe('hasRoundedCorners', () => {
    const width = 100;
    const mockProps = {
      height: 100,
      x: 0,
      value: 1000,
      width,
      yScale: scaleBand() as any,
      fill: 'red',
      hasRoundedCorners: true,
    };
    const borderRadius = (hasBorderRadius: boolean) =>
      hasBorderRadius ? width / 2 : 0;

    it('renders a bar with border radius', () => {
      const borderRadiusValue = borderRadius(true);
      const bar = mount(
        <svg>
          <Bar {...mockProps} />
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `M 0 ${borderRadiusValue} A ${borderRadiusValue} ${borderRadiusValue} 0 0 1 100 ${borderRadiusValue} M 100 ${borderRadiusValue} L 100 100 L 0 100 L 0 ${borderRadiusValue}`,
      });
    });

    it('renders a bar without border radius', () => {
      const borderRadiusValue = borderRadius(false);

      const bar = mount(
        <svg>
          <Bar {...mockProps} hasRoundedCorners={false} />
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `M 0 ${borderRadiusValue} A ${borderRadiusValue} ${borderRadiusValue} 0 0 1 100 ${borderRadiusValue} M 100 ${borderRadiusValue} L 100 100 L 0 100 L 0 ${borderRadiusValue}`,
      });
    });
  });
});