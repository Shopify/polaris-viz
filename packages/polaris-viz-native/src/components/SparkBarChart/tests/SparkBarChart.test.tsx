import {AccessibilityInfo} from 'react-native';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../..';
import {mountWithProvider} from '../../../test-utilities';
import {SparkBarChart} from '../SparkBarChart';

jest
  .spyOn(AccessibilityInfo, 'isReduceMotionEnabled')
  .mockImplementation(() => Promise.resolve(true));

const sampleData: DataSeries = {
  data: [
    {key: 1, value: 100},
    {key: 2, value: 200},
    {key: 3, value: 300},
    {key: 4, value: 500},
  ],
};

describe('<SparkBarChart/>', () => {
  it('renders a single non-comparison chart', () => {
    const wrapper = mountWithProvider(<SparkBarChart data={[sampleData]} />);

    expect(wrapper).toContainReactComponentTimes(ChartContainer, 1);
  });
});
