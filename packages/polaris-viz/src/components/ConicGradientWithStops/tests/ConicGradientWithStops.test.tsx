import React from 'react';
import {mount} from '@shopify/react-testing';

import {ConicGradientWithStops} from '..';
import type {ConicGradientWithStopsProps} from '../ConicGradientWithStops';

const mockProps1 = {
  height: 200,
  width: 200,
  gradient: [
    {color: 'lime', offset: 0},
    {color: 'magenta', offset: 1},
  ],
};
const mockProps2 = {
  height: 200,
  width: 200,
  gradient: [
    {color: 'red', offset: 50},
    {color: 'green', offset: 75},
  ],
};
const mockProps3 = {
  height: 200,
  width: 200,
  gradient: [
    {color: 'purple', offset: 12},
    {color: 'orange', offset: 12},
  ],
};
const mockProps4 = {
  height: 200,
  width: 200,
  gradient: [
    {color: 'black', offset: 0},
    {color: 'white', offset: 166},
  ],
};

const result1 = {
  height: `${mockProps1.height}px`,
  width: `${mockProps1.width}px`,
  backgroundImage: 'conic-gradient(lime 0%, magenta 1%)',
};
const result2 = {
  height: `${mockProps2.height}px`,
  width: `${mockProps2.width}px`,
  backgroundImage: 'conic-gradient(red 50%, green 75%)',
};

const result3 = {
  height: `${mockProps3.height}px`,
  width: `${mockProps3.width}px`,
  backgroundImage: 'conic-gradient(purple 12%, orange 12%)',
};
const result4 = {
  height: `${mockProps4.height}px`,
  width: `${mockProps4.width}px`,
  backgroundImage: 'conic-gradient(black 0%, white 166%)',
};

describe('<ConicGradientWithStops />', () => {
  it.each([
    {
      props: mockProps1,
      style: result1,
    },
    {
      props: mockProps2,
      style: result2,
    },
    {
      props: mockProps3,
      style: result3,
    },
    {
      props: mockProps4,
      style: result4,
    },
  ])('renders a div with the given styles', ({props, style}) => {
    const conicGradient = mount(<ConicGradientWithStops {...props} />);

    expect(conicGradient).toContainReactComponent('div', {
      style,
    });
  });
});
