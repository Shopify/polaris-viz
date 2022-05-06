import React from 'react';
import {scaleLinear} from 'd3-scale';
import {mount} from '@shopify/react-testing';

import {Area} from '../Area';
import {LineChartDataSeriesWithDefaults} from '../../../../../types';
import {DefaultArea} from '../../DefaultArea';
import {SparkArea} from '../../SparkArea';
import {LinearGradientWithStops} from '../../../../../components';

const SERIES: LineChartDataSeriesWithDefaults = {
  data: [],
  color: 'red',
  isComparison: false,
};

describe('<Area />', () => {
  it('returns nothing when data is comparison', () => {
    const area = mount(
      <Area
        series={{...SERIES, isComparison: true}}
        areaPath=""
        type="default"
      />,
    );

    expect(area).toContainReactHtml('');
  });

  describe('type', () => {
    it('returns <DefaultArea /> when "default"', () => {
      const area = mount(
        <svg>
          <Area series={SERIES} areaPath="" type="default" />
        </svg>,
      );

      expect(area).toContainReactComponent(DefaultArea);
    });

    it('returns <SparkArea /> when "spark"', () => {
      const area = mount(
        <svg>
          <Area series={SERIES} areaPath="" type="spark" />
        </svg>,
      );

      expect(area).toContainReactComponent(SparkArea);
    });
  });

  describe('color', () => {
    const sparkArea = '#008000';

    it('renders theme sparkArea when provided', () => {
      const area = mount(
        <svg>
          <Area
            series={SERIES}
            areaPath=""
            type="spark"
            sparkArea={sparkArea}
          />
        </svg>,
      );

      expect(area).toContainReactComponentTimes(LinearGradientWithStops, 1, {
        gradient: [
          {
            color: sparkArea,
            offset: 0,
          },
        ],
      });
    });

    it('renders line color', () => {
      const area = mount(
        <svg>
          <Area series={SERIES} areaPath="" type="spark" />
        </svg>,
      );

      expect(area).toContainReactComponentTimes(LinearGradientWithStops, 1, {
        gradient: [
          {
            color: 'red',
            offset: 0,
          },
        ],
      });
    });
  });
});
