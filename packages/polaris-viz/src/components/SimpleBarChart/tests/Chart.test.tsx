import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {Chart, ChartProps} from '../Chart';
import {LegendContainer} from '../../LegendContainer';
import {
  GroupLabel,
  GradientDefs,
  HorizontalStackedBars,
  HorizontalBars,
  Label,
} from '../../shared';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => {
  return {
    ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
    estimateStringWidth: () => 0,
  };
});

const SERIES: DataSeries[] = [
  {
    name: 'Group 1',
    data: [
      {value: 5, key: 'Label 01'},
      {value: 10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {value: 1, key: 'Label 01'},
      {value: 2, key: 'Label 02'},
      {value: 3, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS: ChartProps = {
  dimensions: {
    height: 300,
    width: 600,
  },
  isAnimated: false,
  data: SERIES,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
    hide: false,
    allowLineWrap: true,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
  },
  type: 'default',
  showLegend: true,
};

describe('<Chart />', () => {
  describe('svg', () => {
    it('renders svg', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent('svg');
    });

    describe('<GradientDefs />', () => {
      it('renders <GradientDefs />', () => {
        const chart = mount(<Chart {...MOCK_PROPS} />);

        expect(chart).toContainReactComponent(GradientDefs);
      });

      it('renders with series colors', () => {
        const chart = mount(<Chart {...MOCK_PROPS} />);

        const defs = chart.find(GradientDefs);

        expect(defs?.props.seriesColors).toStrictEqual([
          [
            {color: '#7f4afa', offset: 0},
            {color: '#997afc', offset: 100},
          ],
          [
            {color: '#3672bb', offset: 0},
            {color: '#4b92e5', offset: 100},
          ],
        ]);
      });

      it('renders with color overrides', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                name: 'Group 1',
                color: 'red',
                data: [
                  {value: 5, key: 'Label 01'},
                  {value: 10, key: 'Label 02'},
                ],
              },
              {
                name: 'Group 2',
                data: [
                  {value: 1, key: 'Label 01'},
                  {value: 2, key: 'Label 02'},
                ],
              },
            ]}
          />,
        );
        const defs = chart.find(GradientDefs);

        expect(defs?.props.seriesColors).toStrictEqual([
          'red',
          [
            {color: '#7f4afa', offset: 0},
            {color: '#997afc', offset: 100},
          ],
        ]);
      });
    });

    it('renders <GroupLabel />', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponentTimes(GroupLabel, 3);
    });
  });

  describe('xAxisOptions', () => {
    describe('labelFormatter', () => {
      it('renders formatted Labels', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              labelFormatter: (value) => `${value} pickles`,
            }}
          />,
        );

        const labels = chart.findAll(Label);

        expect(labels[0]).toContainReactText('5 pickles');
      });
    });
  });

  describe('type', () => {
    it('renders <HorizontalStackedBars /> when "stacked"', () => {
      const chart = mount(<Chart {...MOCK_PROPS} type="stacked" />);

      expect(chart).toContainReactComponent(HorizontalStackedBars);
    });

    it('renders <HorizontalBars /> when "default"', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalBars);
    });
  });

  describe('<LegendContainer />', () => {
    it('renders <LegendContainer /> when showLegend is true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
    });

    it('renders <LegendContainer /> with renderLegendContent when showLegend is true', () => {
      const renderLegendContent = () => (
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
          <li>Group 3</li>
        </ul>
      );

      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          showLegend
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(chart).toContainReactComponent(LegendContainer, {
        renderLegendContent,
      });
    });

    it('does not render <LegendContainer /> when showLegend is false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend={false} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(300);
    });
  });
});
