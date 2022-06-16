import React from 'react';
import {mount} from '@shopify/react-testing';

import {Arc} from '../Arc';
import type {ArcProps} from '../Arc';

describe('<Arc />', () => {
  const mockProps: ArcProps = {
    data: {
      id: 0,
      label: 'Shopify Payments',
      value: 30_000,
      color: 'purple',
    },
    radius: 50,
    startAngle: 0,
    endAngle: 360,
    tabIndex: -1,
    height: 200,
    width: 200,
    accessibilityLabel: 'Spending Card',
  };

  it('renders arc', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M30.68530314925776,9.07811492756904A32,32,0,1,0,-30.68530314925776,-9.07811492756904A32,32,0,1,0,30.68530314925776,9.07811492756904Z`,
    });
  });

  it('renders with tabIndex', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} tabIndex={0} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('foreignObject', {
      tabIndex: 0,
    });
  });

  it('renders with dimmer className if dimmed prop is present', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} dimmed />,
      </svg>,
    );

    expect(arc).toContainReactComponent('foreignObject', {
      className: 'Dimmed',
    });
  });

  it('renders path with role', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} role="img" />,
      </svg>,
    );

    expect(arc).toContainReactComponent('foreignObject', {
      role: 'img',
    });
  });

  it('renders path with aria-label', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('foreignObject', {
      'aria-label': 'Shopify Payments: 30000',
    });
  });

  it('renders two arcs with unique arc component IDs', () => {
    const arcs = mount(
      <div>
        <svg>
          <Arc {...mockProps} tabIndex={0} />,
        </svg>
        <svg>
          <Arc {...mockProps} accessibilityLabel="Earnings Card" tabIndex={0} />
        </svg>
      </div>,
    );

    const [clipPath1, clipPath2] = arcs.findAll('clipPath');

    expect(clipPath1.props.id).not.toBe(clipPath2.props.id);
  });

  it('calls valueFormatter to format the aria-label', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} valueFormatter={(value) => `$${value}`} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('foreignObject', {
      'aria-label': 'Shopify Payments: $30000',
    });
  });

  it('calls onHover when arc gains focus', async () => {
    const spyOnHover = jest.fn();
    const arc = mount(
      <svg>
        <Arc {...mockProps} onHover={spyOnHover} />,
      </svg>,
    );

    arc.find('foreignObject')?.trigger('onFocus');
    await sleep(10);

    expect(spyOnHover).toHaveBeenCalled();
  });

  it('calls onHover when mouse enters the arc', async () => {
    const spyOnHover = jest.fn();
    const arc = mount(
      <svg>
        <Arc {...mockProps} onHover={spyOnHover} />,
      </svg>,
    );

    arc.find('foreignObject')?.trigger('onMouseEnter');
    await sleep(10);

    expect(spyOnHover).toHaveBeenCalled();
  });

  it('calls onBlur when arc loses focus', async () => {
    const spyOnBlur = jest.fn();
    const arc = mount(
      <svg>
        <Arc {...mockProps} onBlur={spyOnBlur} />,
      </svg>,
    );

    arc.find('foreignObject')?.trigger('onBlur');
    await sleep(10);

    expect(spyOnBlur).toHaveBeenCalled();
  });

  it('calls onBlur when mouse leaves the arc', async () => {
    const spyOnBlur = jest.fn();
    const arc = mount(
      <svg>
        <Arc {...mockProps} onBlur={spyOnBlur} />,
      </svg>,
    );

    arc.find('foreignObject')?.trigger('onMouseLeave');
    await sleep(10);

    expect(spyOnBlur).toHaveBeenCalled();
  });

  it('renders div with conic-gradient', async () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('div', {
      style: {
        backgroundImage:
          'conic-gradient(from 0rad, #B176E2, #9F41DC 270rad 360rad, transparent 360rad)',
        height: '200px',
        width: '200px',
      },
    });
  });

  it('renders div without conic-gradient', async () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} isOnlySegment />,
      </svg>,
    );

    expect(arc).toContainReactComponent('div', {
      style: {
        background: '#9F41DC',
        height: '200px',
        width: '200px',
      },
    });
  });
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
