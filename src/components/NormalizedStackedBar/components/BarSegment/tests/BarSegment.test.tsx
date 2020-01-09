import React from 'react';
import {mount} from '@shopify/react-testing';
import {Size, Orientation} from '../../../types';
import {BarSegment} from '../BarSegment';

describe('<BarSegment />', () => {
  describe('renders ', () => {
    it('applies the bar size prop to the div height when the chart is horizontal', async () => {
      const barSegment = mount(
        <BarSegment
          scale={64}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.height).toBe(Size.Small);
    });

    it('applies the bar size prop to the div width when the chart is vertical', async () => {
      const barSegment = mount(
        <BarSegment
          scale={64}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Vertical}
        />,
      );

      expect(barSegment.find('div')!.props.style!.width).toBe(Size.Small);
    });

    it('does not round up a 0 scale', async () => {
      const barSegment = mount(
        <BarSegment
          scale={0}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('0 0 0');
    });

    it('rounds up a scale above 0 and below 1.5', async () => {
      const barSegment = mount(
        <BarSegment
          scale={0.1}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('1.5 0 0');
    });

    it('does not round up a scale above 1.5', async () => {
      const barSegment = mount(
        <BarSegment
          scale={1.51}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('1.51 0 0');
    });
  });
});
