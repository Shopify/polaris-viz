import React from 'react';
import {mount} from '@shopify/react-testing';

import {getColorValue} from '../../../utilities';
import {Sparkbar} from '../Sparkbar';
import {LinearGradient} from '../../LinearGradient';

const sampleData = [100, 200, 300, 500];
const sampleComparison = [
  {x: 0, y: 300},
  {x: 1, y: 300},
  {x: 2, y: 300},
  {x: 3, y: 300},
];

describe('<Sparkbar/>', () => {
  it('renders a <LinearGradient /> when barFillStyle is gradient', () => {
    const wrapper = mount(
      <Sparkbar barFillStyle="gradient" data={sampleData} />,
    );

    expect(wrapper).toContainReactComponent(LinearGradient);
  });

  it('uses a solid colour for fill when barFillStyle is solid', () => {
    const color = 'colorBlue';
    const wrapper = mount(
      <Sparkbar barFillStyle="solid" data={sampleData} color={color} />,
    );

    const colorValue = getColorValue(color);

    expect(wrapper).toContainReactComponent('g', {
      fill: colorValue,
    });
  });

  it('renders an accessibility label', () => {
    const wrapper = mount(
      <Sparkbar data={sampleData} accessibilityLabel="This is a test" />,
    );

    expect(wrapper).toContainReactText('This is a test');
  });

  it('renders bars with 90% opacity when a comparison is present', () => {
    const wrapper = mount(
      <Sparkbar data={sampleData} comparison={sampleComparison} />,
    );

    expect(wrapper).toContainReactComponent('g', {
      opacity: '0.9',
    });
  });

  it('renders bars with 100% opacity when no comparison is present', () => {
    const wrapper = mount(<Sparkbar data={sampleData} />);

    expect(wrapper).toContainReactComponent('g', {
      opacity: '1',
    });
  });

  it('renders a comparison line when the comparison prop is passed', () => {
    const wrapper = mount(
      <Sparkbar data={sampleData} comparison={sampleComparison} />,
    );

    expect(wrapper).toContainReactComponentTimes('path', 5);
  });

  it('does not render a comparison line when the prop is not passed', () => {
    const wrapper = mount(<Sparkbar data={sampleData} />);

    expect(wrapper).toContainReactComponentTimes('path', 4);
  });
});
