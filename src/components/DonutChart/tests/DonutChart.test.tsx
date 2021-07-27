import React from 'react';
import {mount} from '@shopify/react-testing';

import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';
import {Arc, DonutTooltip} from '../components';

describe('<DonutChart />', () => {
  const mockProps: DonutChartProps = {
    accessibilityLabel: 'Payment providers',
    sort: 'asc',
    data: [
      {label: 'Amazon Pay', value: 40, color: 'colorIndigo'},
      {label: 'Other', value: 100, color: 'colorBlue'},
      {label: 'PayPal', value: 250, color: 'colorTeal'},
      {
        label: 'Shopify Payments',
        value: 300,
        color: 'colorGreen',
      },
    ],
  };

  it('renders an SVG element', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('renders accessibility label', () => {
    const chart = mount(
      <DonutChart {...mockProps} accessibilityLabel="Accessibility label" />,
    );

    expect(chart).toContainReactText('Accessibility label');
  });

  it('calls onHover when an Arc is hovered', () => {
    const spyOnHover = jest.fn();
    const chart = mount(<DonutChart {...mockProps} onHover={spyOnHover} />);
    chart.find(Arc)?.trigger('onHover', mockProps.data[0], 1, 50, 50);

    expect(spyOnHover).toHaveBeenCalledWith(mockProps.data[0]);
  });

  it('calls onBlur when an Arc loses focus', () => {
    const spyOnBlur = jest.fn();
    const chart = mount(<DonutChart {...mockProps} onBlur={spyOnBlur} />);
    chart.find(Arc)?.trigger('onBlur');

    expect(spyOnBlur).toHaveBeenCalled();
  });

  describe('<DonutTooltip />', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<DonutChart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactComponent(DonutTooltip);
    });

    it('does not render tooltip if hideTooltip is present', () => {
      const chart = mount(<DonutChart {...mockProps} hideTooltip />);

      expect(chart).not.toContainReactComponent(DonutTooltip);
    });

    it('renders when hovering an Arc', () => {
      const activePointIndex = 0;
      const data = mockProps.data[activePointIndex];
      const currentX = 50;
      const currentY = 70;
      const chart = mount(<DonutChart {...mockProps} />);

      chart
        .find(Arc)
        ?.trigger('onHover', data, activePointIndex, currentX, currentY);
      expect(chart).toContainReactComponent(DonutTooltip, {
        activePointIndex,
        currentX,
        currentY,
        label: data.label,
        value: String(data.value),
      });
    });

    it('hides when removing focus from an Arc', () => {
      const activePointIndex = 1;
      const data = mockProps.data[activePointIndex];
      const currentX = 50;
      const currentY = 70;
      const chart = mount(<DonutChart {...mockProps} />);

      chart
        .find(Arc)
        ?.trigger('onHover', data, activePointIndex, currentX, currentY);
      expect(chart).toContainReactComponent(DonutTooltip);

      chart.find(Arc)?.trigger('onBlur');
      expect(chart).not.toContainReactComponent(DonutTooltip);
    });
  });

  describe('<Arc />', () => {
    it('renders Arcs', () => {
      const data: DonutChartProps['data'] = [
        {label: 'Firt half', value: 50, color: 'colorBlue'},
        {
          label: 'Second half',
          value: 50,
          color: 'colorGreen',
        },
      ];
      const chart = mount(<DonutChart {...mockProps} data={[...data]} />);
      const [arc1, arc2] = chart.findAll(Arc);

      expect(arc1).toHaveReactProps({
        data: data[0],
        index: 0,
        tabIndex: 0,
        role: undefined,
        dimmed: false,
      });
      expect(arc1.props.startAngle).toBeCloseTo(0);
      expect(arc1.props.endAngle).toBeCloseTo(Math.PI);
      expect(arc2).toHaveReactProps({
        data: data[1],
        index: 1,
        tabIndex: 0,
        dimmed: false,
      });
      expect(arc2.props.startAngle).toBeCloseTo(Math.PI);
      expect(arc2.props.endAngle).toBeCloseTo(Math.PI * 2);
    });

    it('renders dimmed Arcs if focused', () => {
      const activePointIndex = 0;
      const data = mockProps.data[activePointIndex];
      const chart = mount(<DonutChart {...mockProps} />);
      chart.find(Arc)?.trigger('onHover', data, activePointIndex, 10, 10);
      const arcs = chart.findAll(Arc);

      expect(
        arcs.map(({props: {dimmed, role}}) => ({dimmed, role})),
      ).toStrictEqual(
        arcs.map((_, index) => ({
          dimmed: activePointIndex !== index,
          role: activePointIndex === index ? 'img' : undefined,
        })),
      );
    });

    it('renders with valueFormatter', () => {
      const valueFormatter = jest.fn();
      const chart = mount(
        <DonutChart {...mockProps} valueFormatter={valueFormatter} />,
      );

      expect(chart).toContainReactComponent(Arc, {
        valueFormatter,
      });
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<DonutChart {...mockProps} data={[]} />);

      expect(chart).toContainReactComponent(Arc, {
        index: 0,
        data: {label: '', value: 0, color: 'colorSky'},
        tabIndex: -1,
        startAngle: 0,
        endAngle: Math.PI * 2,
      });
    });
  });

  describe('sorting', () => {
    it('renders Arcs without sorting', () => {
      const data: DonutChartProps['data'] = [
        {label: 'Other', value: 1, color: 'colorBlue'},
        {
          label: 'Shopify Payments',
          value: 4,
          color: 'colorGreen',
        },
        {label: 'Amazon Pay', value: 3, color: 'colorIndigo'},
        {label: 'PayPal', value: 2, color: 'colorTeal'},
      ];
      const chart = mount(
        <DonutChart {...mockProps} data={[...data]} sort="none" />,
      );
      const arcs = chart.findAll(Arc);

      expect(arcs.map(({props: {data}}) => data)).toStrictEqual(data);
    });

    it('renders Arcs sorted in ascending order', () => {
      const data: DonutChartProps['data'] = [
        {label: 'Other', value: 1, color: 'colorBlue'},
        {
          label: 'Shopify Payments',
          value: 4,
          color: 'colorGreen',
        },
        {label: 'Amazon Pay', value: 3, color: 'colorIndigo'},
        {label: 'PayPal', value: 2, color: 'colorTeal'},
      ];
      const chart = mount(
        <DonutChart {...mockProps} data={[...data]} sort="asc" />,
      );
      const arcs = chart.findAll(Arc);

      expect(arcs.map(({props: {data}}) => data)).toStrictEqual([
        data[0],
        data[3],
        data[2],
        data[1],
      ]);
    });

    it('renders Arcs sorted in descending order', () => {
      const data: DonutChartProps['data'] = [
        {label: 'Other', value: 1, color: 'colorBlue'},
        {
          label: 'Shopify Payments',
          value: 4,
          color: 'colorGreen',
        },
        {label: 'Amazon Pay', value: 3, color: 'colorIndigo'},
        {label: 'PayPal', value: 2, color: 'colorTeal'},
      ];
      const chart = mount(
        <DonutChart {...mockProps} data={[...data]} sort="desc" />,
      );
      const arcs = chart.findAll(Arc);

      expect(arcs.map(({props: {data}}) => data)).toStrictEqual([
        data[1],
        data[2],
        data[3],
        data[0],
      ]);
    });
  });
});
