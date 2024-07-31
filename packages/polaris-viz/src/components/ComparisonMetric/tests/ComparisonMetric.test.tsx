import {mount} from '@shopify/react-testing';

import {ComparisonMetric} from '../ComparisonMetric';
import {TrendIndicator} from '../../TrendIndicator';

describe('<ComparisonMetric />', () => {
  describe('<TrendIndicator />', () => {
    it('renders a <TrendIndicator />', () => {
      const comparisonMetric = mount(
        <ComparisonMetric
          metric="5"
          trend="positive"
          accessibilityLabel="label"
        />,
      );

      expect(comparisonMetric).toContainReactComponent(TrendIndicator);
    });

    it('passes a direction prop for the positive trend', () => {
      const comparisonMetric = mount(
        <ComparisonMetric
          metric="5"
          trend="positive"
          accessibilityLabel="label"
        />,
      );

      expect(comparisonMetric).toContainReactComponent(TrendIndicator, {
        direction: 'upward',
      });
    });

    it('passes a direction prop for the negative trend', () => {
      const comparisonMetric = mount(
        <ComparisonMetric
          metric="5"
          trend="negative"
          accessibilityLabel="label"
        />,
      );

      expect(comparisonMetric).toContainReactComponent(TrendIndicator, {
        direction: 'downward',
      });
    });

    it('does not pass a direction prop for neutral trend', () => {
      const comparisonMetric = mount(
        <ComparisonMetric
          metric="5"
          trend="neutral"
          accessibilityLabel="label"
        />,
      );

      expect(comparisonMetric).toContainReactComponent(TrendIndicator, {
        direction: undefined,
      });
    });
  });

  it('handles undefined metric correctly', () => {
    const comparisonMetric = mount(
      <ComparisonMetric trend="neutral" accessibilityLabel="label" />,
    );

    expect(comparisonMetric).toContainReactComponent(TrendIndicator, {
      value: undefined,
    });
  });

  it('passes the accessibilityLabel', () => {
    const accessibilityLabel = 'Net change';
    const comparisonMetric = mount(
      <ComparisonMetric
        metric="5"
        trend="positive"
        accessibilityLabel={accessibilityLabel}
      />,
    );

    expect(comparisonMetric).toContainReactComponent(TrendIndicator, {
      accessibilityLabel,
    });
  });
});
