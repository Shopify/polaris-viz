import React from 'react';
import {mount} from '@shopify/react-testing';

import {ConicGradientWithStops} from '..';
import type {ConicGradientWithStopsProps} from '../ConicGradientWithStops';

<<<<<<< HEAD
const mockProps1 = {
  height: 200,
  width: 200,
  gradient: [
    {color: 'lime', offset: 0},
    {color: 'magenta', offset: 1},
  ],
};
const mockProps2 = {
  height: 100,
  width: 200,
  gradient: [
    {color: 'red', offset: 50},
    {color: 'green', offset: 75},
    {color: 'blue', offset: 90},
  ],
};
const mockProps3 = {
  height: 300,
  width: 900,
  gradient: [
    {color: 'purple', offset: 10},
    {color: 'orange', offset: 30},
    {color: 'purple', offset: 60},
    {color: 'orange', offset: 100},
  ],
};
const mockProps4 = {
  height: 15,
  width: 30,
  gradient: [{color: 'black', offset: 0}],
};

const result1 = {
  height: `${mockProps1.height}px`,
  width: `${mockProps1.width}px`,
  backgroundImage: 'conic-gradient(lime 0%, magenta 1%)',
};
const result2 = {
  height: `${mockProps2.height}px`,
  width: `${mockProps2.width}px`,
  backgroundImage: 'conic-gradient(red 50%, green 75%, blue 90%)',
};

const result3 = {
  height: `${mockProps3.height}px`,
  width: `${mockProps3.width}px`,
  backgroundImage:
    'conic-gradient(purple 10%, orange 30%, purple 60%, orange 100%)',
};
const result4 = {
  height: `${mockProps4.height}px`,
  width: `${mockProps4.width}px`,
  backgroundImage: 'conic-gradient(black 0%, black 100%)',
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
=======
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
>>>>>>> 4415e3c7 (adds tests to DonutChart)
    });
  });
});
