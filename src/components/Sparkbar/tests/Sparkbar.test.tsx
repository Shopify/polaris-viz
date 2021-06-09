import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {Sparkbar} from '../Sparkbar';
import {LinearGradient} from '../../LinearGradient';

const sampleData = [100, 200, 300, 500];
const sampleComparison = [
  {x: 0, y: 300},
  {x: 1, y: 300},
  {x: 2, y: 300},
  {x: 3, y: 300},
];

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.paddingInner = (paddingInner: any) =>
      paddingInner ? scale : paddingInner;
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.bandwidth = (width: any) => (width ? scale : width);
    return scale;
  }),
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    return scale;
  }),
}));

describe('<Sparkbar/>', () => {
  it('renders a <LinearGradient />', () => {
    const wrapper = mount(<Sparkbar data={sampleData} />);

    expect(wrapper).toContainReactComponent(LinearGradient);
  });

  it('renders a mask', () => {
    const wrapper = mount(<Sparkbar data={sampleData} />);

    expect(wrapper).toContainReactComponent('mask');
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

  it('reduces the chart width according to the offset and margin', () => {
    let rangeSpy = jest.fn();
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      rangeSpy = jest.fn((range: any) => (range ? scale : range));
      scale.range = rangeSpy;
      scale.paddingInner = (paddingInner: any) =>
        paddingInner ? scale : paddingInner;
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.bandwidth = (width: any) => (width ? scale : width);
      return scale;
    });

    const offsetLeft = 100;
    const offsetRight = 50;
    const mockWidth = 0;

    mount(
      <Sparkbar
        data={sampleData}
        dataOffsetLeft={offsetLeft}
        dataOffsetRight={offsetRight}
      />,
    );

    expect(rangeSpy).toHaveBeenCalledWith([
      offsetLeft,
      mockWidth - offsetRight,
    ]);
  });
});
