import {mount} from '@shopify/react-testing';

import {Point, PointProps} from '../Point';

const MOCK_PROPS: PointProps = {
  cx: 100,
  cy: 100,
  active: false,
  color: '#00ff00',
  index: 0,
  isAnimated: false,
};

describe('<Point />', () => {
  it('renders a circle at the given coordinates', () => {
    const point = mount(
      <svg>
        <Point {...MOCK_PROPS} />
      </svg>,
    );

    expect(point).toContainReactComponent('circle', {
      cx: 100,
      cy: 100,
    });
  });

  describe('active', () => {
    it('renders with a radius of 5 when active', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} active />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        // eslint-disable-next-line id-length
        r: 5,
      });
    });

    it('renders with a radius of 0 when not active', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} active={false} />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        // eslint-disable-next-line id-length
        r: 0,
      });
    });
  });

  describe('ariaHidden', () => {
    it('is not aria hidden if the prop is not set', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {'aria-hidden': false});
    });

    it('is aria hidden if the prop is set to true', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} ariaHidden />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {'aria-hidden': true});
    });
  });

  describe('visuallyHidden', () => {
    it('does not adds the visually hidden class if the prop is not set', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        className: 'Point',
      });
    });

    it('adds the visually hidden class if the prop is set to true', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} visuallyHidden />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        className: 'Point VisuallyHidden',
      });
    });
  });

  describe('isAnimated', () => {
    it("has an initial radius of 5 if it's active and not animated", () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} active />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        // eslint-disable-next-line id-length
        r: 5,
      });
    });

    it("has an initial radius of 0 if it's active and animated", () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} active isAnimated />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        // eslint-disable-next-line id-length
        r: 0,
      });
    });
  });

  describe('color', () => {
    it('renders a circle with the given color', () => {
      const point = mount(
        <svg>
          <Point {...MOCK_PROPS} />
        </svg>,
      );

      expect(point).toContainReactComponent('circle', {
        fill: '#00ff00',
      });
    });
  });
});
