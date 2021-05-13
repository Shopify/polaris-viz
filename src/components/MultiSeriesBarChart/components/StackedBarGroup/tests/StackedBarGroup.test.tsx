import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand, scaleLinear} from 'd3-scale';
import {Color} from 'types';
import {StackSeries} from 'components/MultiSeriesBarChart/types';

import {
  MASK_HIGHLIGHT_COLOR,
  MASK_SUBDUE_COLOR,
} from '../../../../../constants';
import {Stack} from '../components';
import {StackedBarGroup} from '../StackedBarGroup';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn((value) => value)),
  scaleBand: jest.fn(() => {
    const scale = (value: any) => value;
    scale.bandwidth = () => 500;
    return scale;
  }),
}));

describe('<StackedBarGroup/>', () => {
  const stackedValues = [
    [0, 1],
    [0, 2],
    [0, 3],
  ] as StackSeries;

  const mockProps = {
    groupIndex: 1,
    data: stackedValues,
    yScale: scaleLinear() as any,
    xScale: scaleBand() as any,
    colors: ['primary', 'secondary'] as Color[],
    activeBarGroup: null,
    onFocus: jest.fn(),
    accessibilityData: [
      {
        title: 'title1',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
      {
        title: 'title2',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
      {
        title: 'title3',
        data: [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label2',
            value: 'value2',
          },
        ],
      },
    ],
  };

  describe('colors', () => {
    describe('if is a solid color', () => {
      it('gets passed to <g> wrapping <Stack>', () => {
        const wrapper = mount(
          <svg>
            <StackedBarGroup
              {...mockProps}
              colors={['primary', 'secondary'] as Color[]}
            />
          </svg>,
        );

        expect(wrapper).toContainReactComponent('g', {
          style: {
            fill: 'rgb(41,35,112)',
          },
        });
      });
    });
    describe('if is a gradient', () => {
      it('passes a gradient url <g> wrapping <Stack>', () => {
        const wrapper = mount(
          <svg>
            <StackedBarGroup
              {...mockProps}
              colors={[
                [
                  {color: '#39337f', offset: 0},
                  {color: '#5052b3', offset: 50},
                  {color: '#1bbe9e', offset: 100},
                ],
                [
                  {color: '#374352', offset: 0},
                  {color: '#4d5e73', offset: 50},
                ],
              ]}
            />
          </svg>,
        );

        expect(wrapper).toContainReactComponent('g', {
          style: {
            fill: expect.stringContaining('#gradient'),
          },
        });
      });
    });
  });

  describe('activeBarGroup', () => {
    it('passes MASK_HIGHLIGHT_COLOR to <g> if is not set', () => {
      const wrapper = mount(
        <svg>
          <StackedBarGroup {...mockProps} activeBarGroup={null} />
        </svg>,
      );

      expect(wrapper.find('mask')).toContainReactComponent('g', {
        style: {fill: MASK_HIGHLIGHT_COLOR},
      });
      expect(wrapper.find('mask')).not.toContainReactComponent('g', {
        style: {fill: MASK_SUBDUE_COLOR},
      });
    });
    it('passes MASK_SUBDUE_COLOR to <g> if is set', () => {
      const wrapper = mount(
        <svg>
          <StackedBarGroup {...mockProps} activeBarGroup={1} />
        </svg>,
      );

      expect(wrapper.find('mask')).toContainReactComponent('g', {
        style: {fill: MASK_SUBDUE_COLOR},
      });
    });
  });

  describe('<Stack/>', () => {
    it('gets rendered with aria-hidden inside <mask>', () => {
      const wrapper = mount(
        <svg>
          <StackedBarGroup {...mockProps} />
        </svg>,
      );

      expect(wrapper.find('mask')).toContainReactComponent(Stack, {
        ariaHidden: true,
      });
    });
    it('gets rendered with aria-hidden false outside <mask>', () => {
      const wrapper = mount(
        <svg>
          <StackedBarGroup {...mockProps} />
        </svg>,
      );

      const stacks = wrapper.findAll(Stack);

      expect(stacks[1]).toHaveReactProps({
        ariaHidden: false,
      });
    });
  });
});
