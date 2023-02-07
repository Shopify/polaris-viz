import {mount} from '@shopify/react-testing';

import {SkipLink} from '../../../components/SkipLink';
import type {BarChartProps} from '../BarChart';
import {BarChart} from '../BarChart';
import {VerticalBarChart} from '../../VerticalBarChart';
import {HorizontalBarChart} from '../../HorizontalBarChart';

describe('<BarChart />', () => {
  const mockProps: BarChartProps = {
    data: [
      {
        data: [
          {key: 'Something', value: 10},
          {key: 'Another', value: 20},
          {key: 'Thing', value: 30},
        ],
        color: 'black',
        name: 'LABEL1',
      },
    ],
    xAxisOptions: {},
    skipLinkText: 'Skip Chart Content',
  };

  it('passes down renderTooltipContent() when not provided to parent props', () => {
    const chart = mount(<BarChart {...mockProps} />);
    const barChart = chart.find(VerticalBarChart);

    expect(barChart?.props.renderTooltipContent).toBeDefined();
  });

  it('sets defaults for xAxisOptions', () => {
    const chart = mount(<BarChart {...mockProps} />);
    const barChart = chart.find(VerticalBarChart);

    expect(barChart?.props.xAxisOptions.labelFormatter).toBeDefined();
    expect(barChart?.props.xAxisOptions.hide).toStrictEqual(false);
  });

  describe('renderLegendContent', () => {
    const renderLegendContent = () => (
      <ul>
        <li>Group 1</li>
        <li>Group 2</li>
        <li>Group 3</li>
      </ul>
    );

    it('passes down renderLegendContent to <VerticalBarChart /> when provided to parent props', () => {
      const chart = mount(
        <BarChart
          {...mockProps}
          direction="vertical"
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(chart).toContainReactComponent(VerticalBarChart, {
        renderLegendContent,
      });
    });

    it('passes down renderLegendContent to <HorizontalBarChart /> when provided to parent props', () => {
      const chart = mount(
        <BarChart
          {...mockProps}
          direction="horizontal"
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(chart).toContainReactComponent(HorizontalBarChart, {
        renderLegendContent,
      });
    });
  });

  describe('direction', () => {
    it('renders a <VerticalBarChart /> when vertical', () => {
      const chart = mount(<BarChart {...mockProps} />);

      expect(chart).toContainReactComponent(VerticalBarChart);
    });

    it('renders a <HorizontalBarChart /> when horizontal', () => {
      const chart = mount(<BarChart {...mockProps} direction="horizontal" />);

      expect(chart).toContainReactComponent(HorizontalBarChart);
    });
  });

  describe('skipLinkText', () => {
    it('renders a <SkipLink />', () => {
      const chart = mount(<BarChart {...mockProps} />);

      expect(chart).toContainReactComponent(SkipLink);
    });

    it('does not render a <SkipLink /> when data is empty', () => {
      const chart = mount(<BarChart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactComponent(SkipLink);
    });
  });
});
