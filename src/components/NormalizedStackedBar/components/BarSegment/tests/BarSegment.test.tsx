import React from 'react';
import {mount} from '@shopify/react-testing';
import {Size, Orientation} from '../../../types';
import {BarSegment} from '../BarSegment';

describe('<BarSegment />', () => {
  describe('renders ', () => {
    it('applies the bar size prop to the div', async () => {
      const barSegment = mount(
        <BarSegment
          barWidth={64}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.height).toBe(30);
    });

    it('does not round up a 0 width', async () => {
      const barSegment = mount(
        <BarSegment
          barWidth={0}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('0 0 0');
    });

    it('rounds up a width above 0 and below 1.5', async () => {
      const barSegment = mount(
        <BarSegment
          barWidth={0.1}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('1.5 0 0');
    });

    it('does not round up a width above 1.5', async () => {
      const barSegment = mount(
        <BarSegment
          barWidth={1.51}
          color="rgb(255, 255, 255)"
          size={Size.Small}
          orientation={Orientation.Horizontal}
        />,
      );

      expect(barSegment.find('div')!.props.style!.flex).toBe('1.51 0 0');
    });
  });
});
