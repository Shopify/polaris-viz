import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarSegment} from '../BarSegment';

describe('<BarSegment />', () => {
  it('gives the child a horizontal small class name', () => {
    const barSegment = mount(
      <BarSegment
        scale={64}
        color="rgb(255, 255, 255)"
        size="small"
        orientation="horizontal"
      />,
    );

    expect(barSegment).toContainReactComponent('div', {
      className: 'Segment horizontal-small',
    });
  });

  it('gives the child a vertical small class name', () => {
    const barSegment = mount(
      <BarSegment
        scale={64}
        color="rgb(255, 255, 255)"
        size="small"
        orientation="vertical"
      />,
    );

    expect(barSegment).toContainReactComponent('div', {
      className: 'Segment vertical-small',
    });
  });

  it('does not round up a 0 scale', () => {
    const barSegment = mount(
      <BarSegment
        scale={0}
        color="rgb(255, 255, 255)"
        size="small"
        orientation="horizontal"
      />,
    );

    const barSegmentFlex = barSegment.find('div')!.props!.style!.flexBasis;

    expect(barSegmentFlex).toBe('0%');
  });

  it('rounds up a scale above 0 and below 1.5', () => {
    const barSegment = mount(
      <BarSegment
        scale={0.1}
        color="rgb(255, 255, 255)"
        size="small"
        orientation="horizontal"
      />,
    );

    const barSegmentFlex = barSegment.find('div')!.props!.style!.flexBasis;

    expect(barSegmentFlex).toBe('1.5%');
  });

  it('does not round up a scale above 1.5', () => {
    const barSegment = mount(
      <BarSegment
        scale={1.51}
        color="rgb(255, 255, 255)"
        size="small"
        orientation="horizontal"
      />,
    );

    const barSegmentFlex = barSegment.find('div')!.props!.style!.flexBasis;

    expect(barSegmentFlex).toBe('1.51%');
  });
});
