import {mount} from '@shopify/react-testing';

import {Area} from '../Area';
import type {LineChartDataSeriesWithDefaults} from '../../../../../types';
import {DefaultArea} from '../../DefaultArea';
import {SparkArea} from '../../SparkArea';

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
});
