import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {Bar} from '../Bar';
import {MASK_HIGHLIGHT_COLOR} from '../../../../../constants';

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
        a0 0 0 010 0
        v1000
        H0
        V0
        a0 0 0 010-0
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
        d: `M3 0
        h94
        a3 3 0 013 3
        v997
        H0
        V3
        a3 3 0 013-3
        Z`,
      });
    });
  });

  describe('rawValue', () => {
    it('gives a 0 value an empty path d attribute and 0 height', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} rawValue={0} />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: ``,
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
