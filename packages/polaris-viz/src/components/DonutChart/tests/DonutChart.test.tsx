import React from 'react';
import {mount} from '@shopify/react-testing';

import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';
import {Arc, ComparisonMetric} from '../components';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  ComparisonMetric: () => null,
}));

describe('<DonutChart />', () => {
  const mockProps: DonutChartProps = {
    accessibilityLabel: 'Accessibility label',
    data: [
      {id: 3, label: 'Shopify Payments', value: 300, color: 'teal'},
      {id: 2, label: 'PayPal', value: 200, color: 'blue'},
      {id: 1, label: 'Other', value: 100, color: 'indigo'},
      {id: 0, label: 'Amazon Pay', value: 50, color: 'purple'},
    ],
  };

  it('renders an SVG element', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('renders accessibility label', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactText('Accessibility label');
  });

  it('renders empty state if data array is empty', () => {
    const chart = mount(<DonutChart {...mockProps} data={[]} />);

    expect(chart).toContainReactComponent(Arc, {
      data: {id: 0, label: '', value: 0, color: 'sky'},
      tabIndex: -1,
      startAngle: 0,
      endAngle: Math.PI * 2,
    });
  });

  it('renders total value', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactComponent('p', {
      children: '650',
    });
  });

  it('renders overriden total value', () => {
    const totalValue = 9001;
    const chart = mount(<DonutChart {...mockProps} total={totalValue} />);

    expect(chart).toContainReactComponent('p', {
      children: '9001',
    });
  });

  it('calls onHover when an Arc is hovered', () => {
    const spyOnHover = jest.fn();
    const chart = mount(<DonutChart {...mockProps} onHover={spyOnHover} />);
    chart.find(Arc)?.trigger('onHover', mockProps.data[0]);

    expect(spyOnHover).toHaveBeenCalledWith(mockProps.data[0]);
  });

  it('calls onBlur when an Arc loses focus', () => {
    const spyOnBlur = jest.fn();
    const chart = mount(<DonutChart {...mockProps} onBlur={spyOnBlur} />);
    chart.find(Arc)?.trigger('onBlur');

    expect(spyOnBlur).toHaveBeenCalled();
  });

  describe('<ComparisonMetric />', () => {
    it('does not render if comparisonMetric is not provided', () => {
      const chart = mount(
        <DonutChart {...mockProps} comparisonMetric={undefined} />,
      );

      expect(chart).not.toContainReactComponent(ComparisonMetric);
    });

    it('does not render if comparisonMetric is infinity', () => {
      const chart = mount(
        <DonutChart {...mockProps} comparisonMetric={Infinity} />,
      );

      expect(chart).not.toContainReactComponent(ComparisonMetric);
    });

    it('renders if comparisonMetric is provided', () => {
      const comparisonMetric = 10;
      const chart = mount(
        <DonutChart {...mockProps} comparisonMetric={comparisonMetric} />,
      );

      expect(chart).toContainReactComponent(ComparisonMetric, {
        percentage: comparisonMetric,
      });
    });
  });

  describe('<Arc />', () => {
    it('renders Arcs', () => {
      const data: DonutChartProps['data'] = [
        {id: 0, label: 'Firt half', value: 50, color: 'blue'},
        {id: 1, label: 'Second half', value: 50, color: 'orange'},
      ];
      const chart = mount(<DonutChart {...mockProps} data={[...data]} />);
      const [arc1, arc2] = chart.findAll(Arc);

      expect(arc1).toHaveReactProps({
        data: data[0],
        tabIndex: 0,
        role: undefined,
        dimmed: false,
      });
      expect(arc1.props.startAngle).toBeCloseTo(0);
      expect(arc1.props.endAngle).toBeCloseTo(Math.PI);
      expect(arc2).toHaveReactProps({
        data: data[1],
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
      chart.find(Arc)?.trigger('onHover', data);
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

    it('renders highlights an Arc if activeArcId is provided', () => {
      const activeArcId = mockProps.data[0].id;
      const chart = mount(
        <DonutChart {...mockProps} activeArcId={activeArcId} />,
      );
      const arcs = chart.findAll(Arc);

      expect(arcs.map(({props: {dimmed}}) => dimmed)).toStrictEqual([
        false,
        true,
        true,
        true,
      ]);
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
});

describe('Multiple <DonutChart />', () => {
  const mockProps: DonutChartProps[] = [
    {
      accessibilityLabel: 'Payment providers',
      data: [
        {id: 3, label: 'Shopify Payments', value: 300, color: 'teal'},
        {id: 2, label: 'PayPal', value: 200, color: 'blue'},
        {id: 1, label: 'Other', value: 100, color: 'indigo'},
        {id: 0, label: 'Amazon Pay', value: 50, color: 'purple'},
      ],
    },
    {
      accessibilityLabel: 'Earnings Card',
      data: [
        {id: 3, label: 'Shopify Payments', value: 300, color: 'teal'},
        {id: 2, label: 'PayPal', value: 200, color: 'blue'},
        {id: 1, label: 'Other', value: 100, color: 'indigo'},
        {id: 0, label: 'Amazon Pay', value: 50, color: 'purple'},
      ],
    },
  ];

  describe('<Arc />', () => {
    it('renders Arcs with unique IDs', () => {
      const chart = mount(
        <div>
          <DonutChart {...mockProps[0]} />
          <DonutChart {...mockProps[1]} />
        </div>,
      );
      const [donut1, donut2] = chart.findAll(DonutChart);

      const donut1ArcIds = donut1
        .findAll('clipPath')
        .map((clipPath) => clipPath.props.id);

      const donut2ArcIds = donut2
        .findAll('clipPath')
        .map((clipPath) => clipPath.props.id);

      let matches = 0;

      donut2ArcIds.forEach((arcId) => {
        if (donut1ArcIds.includes(arcId)) {
          matches++;
        }
      });

      expect(matches).toBe(0);
    });
  });
});
