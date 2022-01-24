import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarSegment} from '../BarSegment';

describe('<BarSegment />', () => {
  const mockProps = {
    scale: 64,
    color: 'rgb(255, 255, 255)',
    size: 'small' as 'small',
    direction: 'horizontal' as 'horizontal',
    roundedCorners: true,
    index: 1,
    isAnimated: false,
  };

  it('gives the child a horizontal small class name', () => {
    const barSegment = mount(<BarSegment {...mockProps} />);

    expect(barSegment).toContainReactComponent('div', {
      className: 'Segment horizontal-RoundedCorners horizontal-small',
    });
  });

  it('gives the child a vertical small class name', () => {
    const barSegment = mount(
      <BarSegment {...mockProps} direction="vertical" />,
    );

    expect(barSegment).toContainReactComponent('div', {
      className: 'Segment vertical-RoundedCorners vertical-small',
    });
  });

  it('does not round up a 0 scale', () => {
    const barSegment = mount(<BarSegment {...mockProps} scale={0} />);

    const barSegmentFlex = barSegment.find('div')!.props!.style!.width;

    expect(barSegmentFlex).toBe('0%');
  });

  it('rounds up a scale above 0 and below 1.5', () => {
    const barSegment = mount(<BarSegment {...mockProps} scale={0.1} />);

    const barSegmentFlex = barSegment.find('div')!.props!.style!.width;

    expect(barSegmentFlex).toBe('1.5%');
  });

  it('does not round up a scale above 1.5', () => {
    const barSegment = mount(<BarSegment {...mockProps} scale={1.51} />);

    const barSegmentFlex = barSegment.find('div')!.props!.style!.width;

    expect(barSegmentFlex).toBe('1.51%');
  });
});
