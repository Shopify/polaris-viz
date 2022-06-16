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
    thickness: 0,
    color: 'lime',
    cornerRadius: 2,
  };

  it('renders arc', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path');
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

    expect(arc).toContainReactComponent(ConicGradientWithStops);
  });
});
