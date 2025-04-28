import {mount} from '@shopify/react-testing';
import {LIGHT_THEME} from '@shopify/polaris-viz-core';

import {SingleTextLine} from '../../../Labels';

import type {Props} from './ShowMoreAnnotationsButton';
import {ShowMoreAnnotationsButton} from './ShowMoreAnnotationsButton';
import {Icon, Shadow} from './components';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

const MOCK_PROPS: Props = {
  annotationsCount: 1,
  isShowingAllAnnotations: false,
  onClick: jest.fn(),
  tabIndex: 0,
  width: 200,
};

describe('<ShowMoreAnnotationsButton />', () => {
  describe('button', () => {
    it('renders a button', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent('button');
    });

    it('responds to a click', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} />
        </svg>,
      );

      chart.find('button')?.trigger('onClick');
      expect(MOCK_PROPS.onClick).toHaveBeenCalled();
    });
  });

  describe('ui', () => {
    it('renders rects', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponentTimes('rect', 2);
    });

    it('renders <SingleTextLine>', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent(SingleTextLine, {
        color: LIGHT_THEME.annotations.textColor,
        text: 'Expand annotations (1)',
        targetWidth: 194,
        y: 6,
        x: 105,
      });
    });
  });

  describe('isShowingAllAnnotations', () => {
    describe('Icon', () => {
      it('renders plus icon when true', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations
            />
          </svg>,
        );

        const path = chart.find(Icon)?.find('path');

        expect(path?.props.d).toStrictEqual(
          'M9 2C9.55228 2 10 1.55228 10 1C10 0.447715 9.55228 0 9 0L1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2L9 2Z',
        );
      });

      it('renders minus icon when false', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations={false}
            />
          </svg>,
        );

        const path = chart.find(Icon)?.find('path');

        expect(path?.props.d).toStrictEqual(
          'M5 0a1 1 0 0 0-1 1v3H1a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0V6h3a1 1 0 1 0 0-2H6V1a1 1 0 0 0-1-1Z',
        );
      });
    });

    describe('Shadow', () => {
      it('renders when true', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations
            />
          </svg>,
        );

        expect(chart).not.toContainReactComponent(Shadow);
      });

      it('does not render when false', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations={false}
            />
          </svg>,
        );

        expect(chart).toContainReactComponent(Shadow);
      });
    });

    describe('rect', () => {
      it('renders transparent when true', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations
            />
          </svg>,
        );

        const path = chart.find('rect');

        expect(path?.props.fill).toStrictEqual('transparent');
        expect(path?.props.stroke).toStrictEqual(
          LIGHT_THEME.annotations.backgroundColor,
        );
      });

      it('renders filled when false', () => {
        const chart = mount(
          <svg>
            <ShowMoreAnnotationsButton
              {...MOCK_PROPS}
              isShowingAllAnnotations={false}
            />
          </svg>,
        );

        const path = chart.findAll('rect');

        expect(path[1]?.props.fill).toStrictEqual(
          LIGHT_THEME.annotations.backgroundColor,
        );
        expect(path[1]?.props.stroke).toStrictEqual(
          LIGHT_THEME.chartContainer.backgroundColor,
        );
      });
    });
  });

  describe('collapseText', () => {
    it('renders default string when undefined', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} isShowingAllAnnotations />
        </svg>,
      );

      expect(chart).toContainReactComponent(SingleTextLine, {
        text: 'Collapse annotations',
      });
    });

    it('renders custom string when provided', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton
            {...MOCK_PROPS}
            isShowingAllAnnotations
            collapseText="Custom collapse text"
          />
        </svg>,
      );

      expect(chart).toContainReactComponent(SingleTextLine, {
        text: 'Custom collapse text',
      });
    });
  });

  describe('expandText', () => {
    it('renders default string when undefined', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent(SingleTextLine, {
        text: 'Expand annotations (1)',
      });
    });

    it('renders custom string when provided', () => {
      const chart = mount(
        <svg>
          <ShowMoreAnnotationsButton
            {...MOCK_PROPS}
            expandText="Custom expand text"
          />
        </svg>,
      );

      expect(chart).toContainReactComponent(SingleTextLine, {
        text: 'Custom expand text (1)',
      });
    });
  });
});
