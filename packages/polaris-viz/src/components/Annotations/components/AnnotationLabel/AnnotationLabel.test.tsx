import {mount} from '@shopify/react-testing';

import {SingleTextLine} from '../../../Labels';

import type {AnnotationLabelProps} from './AnnotationLabel';
import {AnnotationLabel} from './AnnotationLabel';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

const MOCK_PROPS: AnnotationLabelProps = {
  ariaLabel: 'Aria string',
  index: 0,
  hasContent: false,
  isVisible: true,
  label: 'Label',
  position: {
    index: 0,
    line: {
      x: 60,
      y: 0,
    },
    row: 1,
    width: 100,
    x: 10,
    y: 0,
  },
  setActiveIndex: jest.fn(),
  tabIndex: 0,
};

describe('<AnnotationLabel />', () => {
  it('renders a pill', () => {
    const chart = mount(
      <svg>
        <AnnotationLabel {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect', {
      height: 20,
      width: 100,
      ry: 10,
    });
    expect(chart).toContainReactComponent(SingleTextLine, {
      ariaHidden: true,
      text: 'Label',
      targetWidth: 81,
      y: 5,
      x: 50,
    });
  });

  it('renders a text line with textAnchor="middle" starting at the center of the pill', () => {
    const chart = mount(
      <svg>
        <AnnotationLabel {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect', {
      height: 20,
      width: 100,
      ry: 10,
    });
    expect(chart).toContainReactComponent(SingleTextLine, {
      ariaHidden: true,
      text: 'Label',
      targetWidth: 81,
      y: 5,
      x: MOCK_PROPS.position.width / 2,
    });
    expect(chart).toContainReactComponentTimes('text', 1, {
      textAnchor: 'middle',
    });
  });

  describe('button', () => {
    it('renders a foreignObject', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} />
        </svg>,
      );
      expect(chart).toContainReactComponent('foreignObject', {
        height: 20,
        width: 100,
        style: {overflow: 'visible'},
      });
    });

    it('renders a button', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent('button', {
        'aria-label': 'Aria string: Label',
        'aria-describedby': 'annotation-content-0',
      });
    });

    it('responds to mouse-enter event', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} />
        </svg>,
      );

      const button = chart.find('button');

      button?.trigger('onMouseEnter');

      expect(MOCK_PROPS.setActiveIndex).toHaveBeenCalledWith(0);
    });

    it('responds to focus event', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} />
        </svg>,
      );

      const button = chart.find('button');

      button?.trigger('onFocus');

      expect(MOCK_PROPS.setActiveIndex).toHaveBeenCalledWith(0);
    });
  });

  describe('hasContent', () => {
    it('renders a line when true', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} hasContent />
        </svg>,
      );

      expect(chart).toContainReactComponent('line', {
        x1: 10,
        x2: 90,
        y1: 17,
        y2: 17,
        strokeWidth: 1,
      });
    });

    it('renders no line when false', () => {
      const chart = mount(
        <svg>
          <AnnotationLabel {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).not.toContainReactComponent('line');
    });
  });
});
