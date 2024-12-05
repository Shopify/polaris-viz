import {mount} from '@shopify/react-testing';

import {Arc} from '../Arc';
import type {ArcProps} from '../Arc';
import {ConicGradientWithStops} from '../../ConicGradientWithStops/ConicGradientWithStops';

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
      d: 'M1.83697019872103e-15,-30A30,30,0,1,1,-1.83697019872103e-15,30A30,30,0,1,1,1.83697019872103e-15,-30M28.767471702429148,8.510732744595975A30,30,0,1,0,-28.767471702429148,-8.510732744595975A30,30,0,1,0,28.767471702429148,8.510732744595975Z',
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
});
