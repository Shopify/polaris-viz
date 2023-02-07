import {mount} from '@shopify/react-testing';

import {ComparisonMetric} from '../ComparisonMetric';
import {UpChevron, DownChevron} from '../components';

const theme = {
  labelColor: 'black',
  valueColor: 'black',
  trendIndicator: {positive: 'green', negative: 'red', neutral: 'grey'},
};

describe('<ComparisonMetric />', () => {
  it('renders a <UpChevron /> if positive', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric="5"
        trend="positive"
        accessibilityLabel="label"
      />,
    );
    expect(comparisonMetric).toContainReactComponent(UpChevron);
  });

  it('renders a <DownChevron /> if negative', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric="5"
        trend="negative"
        accessibilityLabel="label"
      />,
    );
    expect(comparisonMetric).toContainReactComponent(DownChevron);
  });

  it('renders no chevron if neutral', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric="5"
        trend="neutral"
        accessibilityLabel="label"
      />,
    );
    expect(comparisonMetric).toContainReactComponentTimes('svg', 0);
  });
});
