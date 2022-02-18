import React, {ReactNode} from 'react';
import {Element, mount, Root} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {XAxisLabels} from '../XAxisLabels';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const MOCK_PROPS = {
  bandwidth: 100,
  color: 'red',
  labelFormatter: (value: string) => value,
  chartHeight: 100,
  tallestXAxisLabel: 20,
  ticks: [0, 1, 2],
  xScale: scaleLinear(),
};

function getLabelDiv(element: Element<ReactNode>) {
  return element.find('div')?.domNode;
}

describe('<XAxisLabels />', () => {
  let container: Root<any>;

  beforeEach(() => {
    container = mount(
      <svg>
        <XAxisLabels {...MOCK_PROPS} />
      </svg>,
    );
  });

  it('renders labels', () => {
    const group = container.find('g');
    const labels = container.findAll('foreignObject') ?? [];

    expect(group?.props.transform).toStrictEqual('translate(0,110)');
    expect(labels).toHaveLength(3);
  });

  describe('textAlign', () => {
    it('renders left for first item', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(labels[0].props.width).toStrictEqual(50);
      expect(getLabelDiv(labels[0])?.style.textAlign).toStrictEqual('left');
    });

    it('renders right for last item', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(labels[2].props.width).toStrictEqual(50);
      expect(getLabelDiv(labels[2])?.style.textAlign).toStrictEqual('right');
    });

    it('renders center for middle items', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(labels[1].props.width).toStrictEqual(100);
      expect(getLabelDiv(labels[1])?.style.textAlign).toStrictEqual('center');
    });

    it('renders middle labels at full width', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(labels[1].props.width).toStrictEqual(100);
    });

    it('renders the left and right labels at half width', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(labels[0].props.width).toStrictEqual(50);
      expect(labels[2].props.width).toStrictEqual(50);
    });
  });

  describe('Padding', () => {
    it('removes padding from first and last items', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(getLabelDiv(labels[0])?.style.padding).toStrictEqual('0px');
      expect(getLabelDiv(labels[2])?.style.padding).toStrictEqual('0px');
    });

    it('adds padding to middle items', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(getLabelDiv(labels[1])?.style.padding).toStrictEqual('0px 10px');
    });
  });

  describe('Max Height', () => {
    it('applies max-height to labels', () => {
      const labels = container.findAll('foreignObject') ?? [];

      expect(getLabelDiv(labels[0])?.style.maxHeight).toStrictEqual('45px');
    });
  });
});
