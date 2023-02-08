/* eslint-disable react/jsx-no-constructed-context-values */
import {mount} from '@shopify/react-testing';
import {ChartContext} from '@shopify/polaris-viz-core';

import {BarSegment} from '../BarSegment';
import characterWidths from '../../../../../data/character-widths.json';
import characterWidthOffsets from '../../../../../data/character-width-offsets.json';

describe('<BarSegment />', () => {
  const mockProps = {
    activeIndex: -1,
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

  it('gives the child an all rounded corners class name when scale is 100', () => {
    const barSegment = mount(<BarSegment {...mockProps} scale={100} />);

    expect(barSegment).toContainReactComponent('div', {
      className: 'Segment RoundedCorners horizontal-small',
    });
  });

  it('does not round up a 0 scale', () => {
    const barSegment = mount(<BarSegment {...mockProps} scale={0} />);

    barSegment.act(() => {
      requestAnimationFrame(() => {
        const barSegmentFlex = barSegment.find('div')!.props!.style!.width;
        expect(barSegmentFlex).toBe('0%');
      });
    });
  });

  it('rounds up a scale above 0 and below 1.5', () => {
    const barSegment = mount(
      <ChartContext.Provider
        value={{
          shouldAnimate: false,
          characterWidths,
          characterWidthOffsets,
        }}
      >
        <BarSegment {...mockProps} scale={0.1} />
      </ChartContext.Provider>,
    );

    barSegment.act(() => {
      requestAnimationFrame(() => {
        const barSegmentFlex = barSegment.find('div')!.props!.style!.width;
        expect(barSegmentFlex).toBe('1.5%');
      });
    });
  });

  it('does not round up a scale above 1.5', () => {
    const barSegment = mount(
      <ChartContext.Provider
        value={{
          shouldAnimate: false,
          characterWidths,
          characterWidthOffsets,
        }}
      >
        <BarSegment {...mockProps} scale={1.51} />
      </ChartContext.Provider>,
    );

    const barSegmentFlex = barSegment.find('div')!.props!.style!.width;

    expect(barSegmentFlex).toBe('1.51%');
  });
});
