import {mount} from '@shopify/react-testing';
import {LIGHT_THEME} from '@shopify/polaris-viz-core';

import type {Props} from '../TooltipRow';
import {TooltipRow} from '../TooltipRow';
import {SeriesIcon} from '../../../../shared/SeriesIcon';
import {PREVIEW_ICON_SIZE} from '../../../../../constants';
import {TrendIndicator} from '../../../..';

describe('<TooltipRow />', () => {
  describe('label', () => {
    it('renders the label', () => {
      const component = mount(
        <TooltipRow {...MOCK_PROPS} label="Text Label" />,
      );

      expect(component).toContainReactComponent('span', {
        className: 'Truncate',
        style: {
          color: LIGHT_THEME.tooltip.textColor,
          marginRight: 10,
        },
        children: 'Text Label',
      });
    });
  });

  describe('shape', () => {
    it('renders a <SeriesIcon /> with provided shape', () => {
      const component = mount(
        <TooltipRow {...MOCK_PROPS} shape="Bar" color="red" />,
      );

      expect(component).toContainReactComponent(SeriesIcon, {
        shape: 'Bar',
      });
    });
  });

  describe('value', () => {
    it('renders the value', () => {
      const component = mount(<TooltipRow {...MOCK_PROPS} value="200" />);

      expect(component).toContainReactComponent('span', {
        className: 'Value',
        style: {
          color: LIGHT_THEME.tooltip.textColor,
        },
        children: '200',
      });
    });
  });

  describe('color', () => {
    it('renders a <SeriesIcon /> with provided color', () => {
      const component = mount(<TooltipRow {...MOCK_PROPS} color="red" />);

      expect(component).toContainReactComponent('div', {
        style: {
          width: PREVIEW_ICON_SIZE,
        },
      });

      expect(component).toContainReactComponent(SeriesIcon, {
        color: 'red',
      });
    });

    it('does not render a <SeriesIcon /> when color is null', () => {
      const component = mount(<TooltipRow {...MOCK_PROPS} />);

      expect(component).not.toContainReactComponent(SeriesIcon);
    });
  });

  describe('isComparison', () => {
    it('overrides <SeriesIcon /> values when true', () => {
      const component = mount(
        <TooltipRow {...MOCK_PROPS} color="red" isComparison />,
      );

      expect(component).toContainReactComponent(SeriesIcon, {
        lineStyle: 'dotted',
      });
    });
  });

  describe('renderSeriesIcon?', () => {
    it('renders custom content instead of <SeriesIcon /> when provided', () => {
      const component = mount(
        <TooltipRow
          {...MOCK_PROPS}
          renderSeriesIcon={() => <div>Custom Icon</div>}
          color="red"
        />,
      );

      expect(component).toContainReactComponent('div', {
        children: 'Custom Icon',
      });
      expect(component).not.toContainReactComponent(SeriesIcon);
    });
  });

  describe('trend', () => {
    it('renders a <TrendIndicator /> when provided', () => {
      const component = mount(
        <TooltipRow {...MOCK_PROPS} trend={{value: '100'}} />,
      );

      expect(component).toContainReactComponent(TrendIndicator, {
        value: '100',
      });
    });

    it('does not render a <TrendIndicator /> when null', () => {
      const component = mount(<TooltipRow {...MOCK_PROPS} />);

      expect(component).not.toContainReactComponent(TrendIndicator);
    });
  });
});

const MOCK_PROPS: Props = {
  label: 'Label',
  shape: 'Line',
  value: '100',
};
