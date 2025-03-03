import {mount} from '@shopify/react-testing';

import type {Props} from '../TooltipSeries';
import {TooltipSeries} from '../TooltipSeries';
import {TooltipSeriesName} from '../../TooltipSeriesName';

describe('<TooltipSeries />', () => {
  describe('children', () => {
    it('renders children', () => {
      const component = mount(
        <TooltipSeries {...MOCK_PROPS}>
          <div>Children</div>
        </TooltipSeries>,
      );

      expect(component).toContainReactText('Children');
    });
  });

  describe('templateColumnCount', () => {
    it('passes a value of 2 to gridTemplateColumns when null', () => {
      const component = mount(<TooltipSeries {...MOCK_PROPS} />);

      expect(component).toContainReactComponent('div', {
        style: {
          gridTemplateColumns: 'repeat(2, auto)',
        },
      });
    });

    it('passes value to gridTemplateColumns when provided', () => {
      const component = mount(
        <TooltipSeries {...MOCK_PROPS} templateColumnCount={3} />,
      );

      expect(component).toContainReactComponent('div', {
        style: {
          gridTemplateColumns: 'repeat(3, auto)',
        },
      });
    });
  });

  describe('name', () => {
    it('renders <TooltipSeriesName /> when provided', () => {
      const component = mount(<TooltipSeries {...MOCK_PROPS} name="Test" />);

      expect(component).toContainReactComponent(TooltipSeriesName, {
        children: 'Test',
      });
    });

    it('does not render <TooltipSeriesName /> when null', () => {
      const component = mount(<TooltipSeries {...MOCK_PROPS} />);

      expect(component).not.toContainReactComponent(TooltipSeriesName);
    });
  });
});

const MOCK_PROPS: Props = {
  children: null,
};
