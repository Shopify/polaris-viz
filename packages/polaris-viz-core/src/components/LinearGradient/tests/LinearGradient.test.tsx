import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinearGradient} from '../LinearGradient';

const defaultProps = {
  id: 'someID',
  gradient: [
    {
      color: 'white',
      offset: 0,
    },
    {color: 'black', offset: 100},
  ],
};

describe('<LinearGradient />', () => {
  describe('gradient', () => {
    it('renders a stop for each color provided', () => {
      const gradient = mount(
        <svg>
          <LinearGradient
            {...defaultProps}
            gradient={[
              {
                color: 'white',
                offset: 0,
              },
              {color: 'black', offset: 100},
            ]}
          />
        </svg>,
      );

      expect(gradient).toContainReactComponentTimes('stop', 2);
    });

    it('gives each stop its color and offset', () => {
      const gradient = mount(
        <svg>
          <LinearGradient
            {...defaultProps}
            gradient={[
              {
                color: 'white',
                offset: 0,
              },
              {color: 'black', offset: 100},
            ]}
          />
        </svg>,
      );

      const stops = gradient.findAll('stop');

      expect(stops[0]).toHaveReactProps({
        stopColor: 'white',
        offset: '0%',
      });
      expect(stops[1]).toHaveReactProps({
        stopColor: 'black',
        offset: '100%',
      });
    });
  });

  describe('x1, x2, y1,y2 and gradientUnits', () => {
    it('get passed to the underlying <Gradient/>', () => {
      const gradient = mount(
        <svg>
          <LinearGradient
            {...defaultProps}
            x1="0px"
            x2="100px"
            y1="50px"
            y2="500px"
            gradientUnits="userSpaceOnUse"
          />
        </svg>,
      );

      expect(gradient.find('linearGradient')!.props).toStrictEqual(
        expect.objectContaining({
          x1: '0px',
          x2: '100px',
          y1: '50px',
          y2: '500px',
          gradientUnits: 'userSpaceOnUse',
        }),
      );
    });
  });
});
