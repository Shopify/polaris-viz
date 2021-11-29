import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {Bar} from '../Bar';
import {
  MASK_HIGHLIGHT_COLOR,
  ROUNDED_BAR_RADIUS,
} from '../../../../../constants';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => jest.fn((value) => value)),
}));

const defaultProps = {
  height: 1000,
  color: MASK_HIGHLIGHT_COLOR,
  isSelected: false,
  x: 0,
  rawValue: 1000,
  width: 100,
  yScale: scaleBand() as any,
  index: 1,
  onFocus: jest.fn(),
  tabIndex: 0,
  rotateZeroBars: false,
  zeroPosition: 0,
};

describe('<Bar/>', () => {
  describe('hasRoundedCorners', () => {
    it('renders sharp corners if false', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} hasRoundedCorners={false} />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `M0 0
        h100
        a0 0 0 0 1 0 0
        v1000
        H0
        V0
        a0 0 0 0 1 0 -0
        Z`,
      });
    });

    it('rounds the corners if true', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} hasRoundedCorners />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `M4 0
        h92
        a4 4 0 0 1 4 4
        v996
        H0
        V4
        a4 4 0 0 1 4 -4
        Z`,
      });
    });

    it('rounds the corner if true and height is less than the radius', () => {
      const bar = mount(
        <svg>
          <Bar
            {...defaultProps}
            height={ROUNDED_BAR_RADIUS - 1}
            hasRoundedCorners
          />
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `M4 0
        h92
        a4 4 0 0 1 4 3
        v0
        H0
        V3
        a4 4 0 0 1 4 -3
        Z`,
      });
    });
  });

  describe('color', () => {
    it('gets passed to the underlying path', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} color="rgb(156, 106, 222)" />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        fill: 'rgb(156, 106, 222)',
      });
    });
  });
});
