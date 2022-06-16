import React from 'react';
import {mount} from '@shopify/react-testing';

import {ConicGradientWithStops} from '..';
import type {ConicGradientWithStopsProps} from '../ConicGradientWithStops';

describe('<ConicGradientWithStops />', () => {
  const mockProps: ConicGradientWithStopsProps = {
    height: 200,
    width: 200,
    gradient: [
      {color: 'lime', offset: 0},
      {color: 'magenta', offset: 100},
    ],
  };
  const conicGradientValue = 'conic-gradient(lime 0%, magenta 100%)';

  it('renders a div with the given styles', () => {
    const conicGradient = mount(<ConicGradientWithStops {...mockProps} />);

    expect(conicGradient).toContainReactComponent('div', {
      style: {
        height: `${mockProps.height}px`,
        width: `${mockProps.width}px`,
        backgroundImage: conicGradientValue,
      },
    });
  });
});
