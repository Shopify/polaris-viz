import {mount} from '@shopify/react-testing';

import {Tooltip} from '../Tooltip';
import {TooltipContentContainer} from '../../../../TooltipContent';
import {SeriesIcon} from '../../../../shared/SeriesIcon';
import {FUNNEL_CHART_SEGMENT_FILL} from '../../../../shared/FunnelChartSegment';
import {FUNNEL_CHART_CONNECTOR_GRADIENT} from '../../../../shared/FunnelChartConnector';

const MOCK_DATA_SERIES = [
  {key: 'Step 1', value: 1000},
  {key: 'Step 2', value: 600},
  {key: 'Step 3', value: 300},
];

const MOCK_TOOLTIP_LABELS = {
  reached: 'Reached',
  dropped: 'Dropped',
};

const mockLabelFormatter = (value: number) => `${value}`;
const mockPercentageFormatter = (value: number) => `${value}%`;

describe('<Tooltip />', () => {
  it('renders a TooltipContentContainer', () => {
    const tooltip = mount(
      <Tooltip
        activeIndex={0}
        dataSeries={MOCK_DATA_SERIES}
        tooltipLabels={MOCK_TOOLTIP_LABELS}
        labelFormatter={mockLabelFormatter}
        percentageFormatter={mockPercentageFormatter}
      />,
    );

    expect(tooltip).toContainReactComponent(TooltipContentContainer);
  });

  describe('first step', () => {
    it('only shows reached information', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={0}
          dataSeries={MOCK_DATA_SERIES}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip.findAll(SeriesIcon)).toHaveLength(1);
      expect(tooltip).toContainReactText('Reached');
      expect(tooltip).not.toContainReactText('Dropped');
    });

    it('shows expected value and percentage', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={0}
          dataSeries={MOCK_DATA_SERIES}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('1000');
      expect(tooltip).toContainReactText('100%');
    });
  });

  describe('subsequent steps', () => {
    it('shows both reached and dropped information', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={1}
          dataSeries={MOCK_DATA_SERIES}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip.findAll(SeriesIcon)).toHaveLength(2);
      expect(tooltip).toContainReactText('Reached');
      expect(tooltip).toContainReactText('Dropped');
    });

    it('shows expected values and percentages', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={1}
          dataSeries={MOCK_DATA_SERIES}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('600');
      expect(tooltip).toContainReactText('60%');

      expect(tooltip).toContainReactText('400');
      expect(tooltip).toContainReactText('40%');
    });

    it('shows expected values and percentages for last step', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={2}
          dataSeries={MOCK_DATA_SERIES}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('300');
      expect(tooltip).toContainReactText('50%');

      expect(tooltip).toContainReactText('300');
      expect(tooltip).toContainReactText('50%');
    });
  });

  it('renders icons with expected colors', () => {
    const tooltip = mount(
      <Tooltip
        activeIndex={1}
        dataSeries={MOCK_DATA_SERIES}
        tooltipLabels={MOCK_TOOLTIP_LABELS}
        labelFormatter={mockLabelFormatter}
        percentageFormatter={mockPercentageFormatter}
      />,
    );

    const icons = tooltip.findAll(SeriesIcon);
    expect(icons[0]).toHaveReactProps({color: FUNNEL_CHART_SEGMENT_FILL});
    expect(icons[1]).toHaveReactProps({color: FUNNEL_CHART_CONNECTOR_GRADIENT});
  });

  describe('null value handling', () => {
    it('shows dash for current step when value is null', () => {
      const dataWithNull = [
        {key: 'Step 1', value: 1000},
        {key: 'Step 2', value: null},
        {key: 'Step 3', value: 300},
      ];

      const tooltip = mount(
        <Tooltip
          activeIndex={1}
          dataSeries={dataWithNull}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('-');
      expect(tooltip.findAll(SeriesIcon)).toHaveLength(1);
    });

    it('shows dash for percentages when previous step is null', () => {
      const dataWithNull = [
        {key: 'Step 1', value: null},
        {key: 'Step 2', value: 600},
        {key: 'Step 3', value: 300},
      ];

      const tooltip = mount(
        <Tooltip
          activeIndex={1}
          dataSeries={dataWithNull}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('-');
      expect(tooltip.findAll(SeriesIcon)).toHaveLength(1);
    });

    it('handles undefined values in data series', () => {
      const dataWithUndefined = [
        {key: 'Step 1', value: 1000},
        {key: 'Step 2', value: undefined},
        {key: 'Step 3', value: 300},
      ];

      const tooltip = mount(
        <Tooltip
          activeIndex={1}
          dataSeries={dataWithUndefined as any}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip).toContainReactText('-');
      expect(tooltip.findAll(SeriesIcon)).toHaveLength(1);
    });

    it('shows only reached info when previous step is missing', () => {
      const tooltip = mount(
        <Tooltip
          activeIndex={0}
          dataSeries={[{key: 'Step 1', value: 1000}]}
          tooltipLabels={MOCK_TOOLTIP_LABELS}
          labelFormatter={mockLabelFormatter}
          percentageFormatter={mockPercentageFormatter}
        />,
      );

      expect(tooltip.findAll(SeriesIcon)).toHaveLength(1);
      expect(tooltip).toContainReactText(MOCK_TOOLTIP_LABELS.reached);
      expect(tooltip).not.toContainReactText(MOCK_TOOLTIP_LABELS.dropped);
    });
  });
});
