import React from 'react';
import {mount} from '@shopify/react-testing';

import {Arc} from '../Arc';
import type {ArcProps} from '../Arc';
import {ConicGradientWithStops} from '../../../../ConicGradientWithStops';

describe('<Arc />', () => {
  const mockProps: ArcProps = {
    radius: 50,
    startAngle: 0,
    endAngle: 360,
    height: 200,
    width: 200,
    thickness: 20,
    color: 'lime',
    cornerRadius: 2,
  };

  it('renders arc', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M28.767471702429148,8.510732744595975A30,30,0,1,0,-28.767471702429148,-8.510732744595975A30,30,0,1,0,28.767471702429148,8.510732744595975Z',
    });
  });

  it('renders two arcs with unique arc component IDs', () => {
    const arcs = mount(
      <div>
        <svg>
          <Arc {...mockProps} />,
        </svg>
        <svg>
          <Arc {...mockProps} />
        </svg>
      </div>,
    );

    const [clipPath1, clipPath2] = arcs.findAll('clipPath');

    expect(clipPath1.props.id).not.toBe(clipPath2.props.id);
  });

  it('renders with ConicGradientWithStops', async () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent(ConicGradientWithStops, {
      height: mockProps.height,
      width: mockProps.width,
    });
  });

  describe('color', () => {
    it('renders with solid color', async () => {
      const arc = mount(
        <svg>
          <Arc {...mockProps} />,
        </svg>,
      );

      const gradient = [
        {
          color: 'lime',
          offset: 0,
        },
        {
          color: 'lime',
          offset: 1,
        },
      ];

      expect(arc).toContainReactComponent(ConicGradientWithStops, {
        gradient,
      });
    });

    it('renders with gradient', async () => {
      const gradient = [
        {
          color: 'lime',
          offset: 0,
        },
        {
          color: 'magenta',
          offset: 1,
        },
      ];

      const arc = mount(
        <svg>
          <Arc {...mockProps} color={gradient} />,
        </svg>,
      );

      expect(arc).toContainReactComponent(ConicGradientWithStops, {
        gradient,
      });
    });
  });

  describe('thickness', () => {
    it.each([
      {
        thickness: 0,
        expected:
          'M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M47.94578617071525,14.184554574326624A50,50,0,1,0,-47.94578617071525,-14.184554574326624A50,50,0,1,0,47.94578617071525,14.184554574326624Z',
      },
      {
        thickness: 5,
        expected:
          'M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M43.15120755364372,12.766099116893962A45,45,0,1,0,-43.15120755364372,-12.766099116893962A45,45,0,1,0,43.15120755364372,12.766099116893962Z',
      },
      {
        thickness: 20,
        expected:
          'M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M28.767471702429148,8.510732744595975A30,30,0,1,0,-28.767471702429148,-8.510732744595975A30,30,0,1,0,28.767471702429148,8.510732744595975Z',
      },
      {
        thickness: 50,
        expected:
          'M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50Z',
      },
    ])('returns d when thickness is $thickness', ({thickness, expected}) => {
      const arc = mount(
        <svg>
          <Arc {...mockProps} thickness={thickness} />,
        </svg>,
      );
      expect(arc.find('path').props.d).toStrictEqual(expected);
    });
  });
});
