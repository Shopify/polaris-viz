import React from 'react';
import {mount} from '@shopify/react-testing';

import {Arc} from '../Arc';
import type {ArcProps} from '../Arc';

describe('<Arc />', () => {
  const mockProps: ArcProps = {
    data: {
      label: 'Shopify Payments',
      value: 30_000,
      color: 'colorGreen',
    },
    radius: 50,
    startAngle: 0,
    endAngle: 360,
    index: 1,
    tabIndex: -1,
  };

  it('renders arc', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      strokeWidth: 5,
      fill: 'rgb(80, 184, 60)',
      // eslint-disable-next-line id-length
      d: `M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M26.84964025560054,7.94335056162291A28,28,0,1,0,-26.84964025560054,-7.94335056162291A28,28,0,1,0,26.84964025560054,7.94335056162291Z`,
    });
  });

  it('renders with tabIndex', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} tabIndex={0} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      tabIndex: 0,
    });
  });

  it('renders with dimmer className if dimmed prop is present', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} dimmed />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      className: 'Arc dimmed',
    });
  });

  it('renders path with role', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} role="img" />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      role: 'img',
    });
  });

  it('renders path with aria-label', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
      'aria-label': 'Shopify Payments: 30000',
    });
  });

  it('calls valueFormatter to format the aria-label', () => {
    const arc = mount(
      <svg>
        <Arc {...mockProps} valueFormatter={(value) => `$${value}`} />,
      </svg>,
    );

    expect(arc).toContainReactComponent('path', {
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

    arc.find('path')?.trigger('onFocus');
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

    arc.find('path')?.trigger('onMouseEnter');
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

    arc.find('path')?.trigger('onBlur');
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

    arc.find('path')?.trigger('onMouseLeave');
    await sleep(10);
    expect(spyOnBlur).toHaveBeenCalled();
  });
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
