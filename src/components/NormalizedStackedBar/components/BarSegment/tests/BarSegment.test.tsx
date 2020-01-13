import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarSegment} from '../BarSegment';
import {Segment} from '../BarSegment.style';

describe('<BarSegment />', () => {
  it('applies the bar size prop to the div height when the chart is horizontal', () => {
    const barSegment = mount(
      <BarSegment
        scale={64}
        color="rgb(255, 255, 255)"
        size={10}
        orientation="horizontal"
      />,
    );

    expect(barSegment.find(Segment)!.props.height).toBe(10);
  });

  it('applies the bar size prop to the div width when the chart is vertical', () => {
    const barSegment = mount(
      <BarSegment
        scale={64}
        color="rgb(255, 255, 255)"
        size={10}
        orientation="vertical"
      />,
    );

    expect(barSegment.find(Segment)!.props.width).toBe(10);
  });

  it('does not round up a 0 scale', () => {
    const barSegment = mount(
      <BarSegment
        scale={0}
        color="rgb(255, 255, 255)"
        size={10}
        orientation="horizontal"
      />,
    );

    expect(barSegment.find(Segment)!.props.scale).toBe(0);
  });

  it('rounds up a scale above 0 and below 1.5', () => {
    const barSegment = mount(
      <BarSegment
        scale={0.1}
        color="rgb(255, 255, 255)"
        size={10}
        orientation="horizontal"
      />,
    );

    expect(barSegment.find(Segment)!.props.scale).toBe(1.5);
  });

  it('does not round up a scale above 1.5', () => {
    const barSegment = mount(
      <BarSegment
        scale={1.51}
        color="rgb(255, 255, 255)"
        size={10}
        orientation="horizontal"
      />,
    );

    expect(barSegment.find(Segment)!.props.scale).toBe(1.51);
  });
});
