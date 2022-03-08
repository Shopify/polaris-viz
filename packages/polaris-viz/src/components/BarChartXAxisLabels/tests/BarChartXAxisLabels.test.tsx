import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand, scaleLinear} from 'd3-scale';

import {
  BarChartXAxisLabels,
  BarChartXAxisLabelsProps,
} from '../BarChartXAxisLabels';
import {TextLine} from '../../../components/Labels';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
  scaleBand: jest.requireActual('d3-scale').scaleBand,
}));
const MOCK_PROPS: BarChartXAxisLabelsProps = {
  chartX: 10,
  chartY: 15,
  labels: ['Sample Label 1', 'Sample Label 2', 'Sample Label 3'],
  labelWidth: 100,
  onHeightChange: jest.fn(),
  xScale: scaleBand(),
  reducedLabelIndexes: [],
};

describe('<BarChartXAxisLabels />', () => {
  it('renders <TextLine /> for each label', () => {
    const content = mount(
      <svg>
        <BarChartXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponentTimes(TextLine, 3);
  });

  it('applies transform to group', () => {
    const content = mount(
      <svg>
        <BarChartXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponent('g', {
      transform: `translate(10,15)`,
    });
  });

  describe('reducedLabelIndexes', () => {
    it('skips <TextLine /> when index matches', () => {
      const content = mount(
        <svg>
          <BarChartXAxisLabels {...MOCK_PROPS} reducedLabelIndexes={[0, 2]} />
        </svg>,
      );

      expect(content).toContainReactComponentTimes(TextLine, 2);
    });
  });
});
