import React from 'react';
import {mount} from '@shopify/react-testing';
import {DataGroup} from '@shopify/polaris-viz-core';

import {Chart, ChartProps} from '../Chart';
import {getXAxisOptionsWithDefaults, normalizeData} from '../../../utilities';
import {LegendContainer} from '../../LegendContainer';
import {Annotations, YAxisAnnotations} from '../../Annotations';

jest.mock('../../../hooks/useThemeSeriesColorsForDataGroup', () => ({
  useThemeSeriesColorsForDataGroup: () => [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
  ],
}));

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  // estimateStringWidth: jest.fn(() => 100),
  // getAverageColor: jest.fn(() => 'red'),
}));

const DATA: DataGroup[] = [
  {
    shape: 'Bar',
    name: 'Total Sales',
    series: [
      {
        name: 'POS',
        data: [{value: 3, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Online',
        data: [{value: 4, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Mobile',
        data: [{value: 7, key: '2020-07-07T12:00:00'}],
      },
    ],
  },
  {
    shape: 'Line',
    name: 'Total Sessions',
    series: [
      {
        name: 'Sessions from Google ads',
        data: [{value: 333, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Sessions from Facebooks ads',
        data: [{value: 709, key: '2020-07-07T12:00:00'}],
      },
    ],
  },
];

const PROPS: ChartProps = {
  annotationsLookupTable: {},
  data: DATA,
  dimensions: {height: 400, width: 800},
  renderTooltipContent: () => null,
  showLegend: false,
  theme: 'Default',
  xAxisOptions: getXAxisOptionsWithDefaults(),
};

describe('<Chart />', () => {
  it('does not render <LegendContainer /> when false', () => {
    const chart = mount(<Chart {...PROPS} showLegend={false} />);
    const svg = chart.find('svg');

    expect(chart).not.toContainReactComponent(LegendContainer);

    expect(svg?.props.height).toStrictEqual(400);
  });

  it('renders <LegendContainer /> when true', () => {
    const chart = mount(<Chart {...PROPS} showLegend />);

    expect(chart).toContainReactComponent(LegendContainer);
  });

  describe('annotationsLookupTable', () => {
    it('does not render <Annotations /> when empty', () => {
      const chart = mount(<Chart {...PROPS} />);

      expect(chart).not.toContainReactComponent(Annotations);
      expect(chart).not.toContainReactComponent(YAxisAnnotations);
    });

    it('renders <Annotations /> when not empty', () => {
      const annotationsLookupTable = normalizeData(
        [{label: '', startIndex: 0, axis: 'x'}],
        'startIndex',
      );

      const chart = mount(
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(Annotations);
    });

    it('renders <YAXisAnnotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '1',
            label: 'Sales increase',
            axis: 'y',
          },
        ],
        'startKey',
      );

      const chart = mount(
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(YAxisAnnotations);
      expect(chart).not.toContainReactComponent(Annotations);
    });

    it('renders <Annotations /> & <YAXisAnnotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '10',
            label: 'Sales increase',
            axis: 'x',
          },
          {
            startKey: '1',
            label: 'Sales increase',
            axis: 'y',
          },
        ],
        'startKey',
      );

      const chart = mount(
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(YAxisAnnotations);
      expect(chart).toContainReactComponent(Annotations);
    });
  });
});
