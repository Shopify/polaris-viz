import React from 'react';
import {mount} from '@shopify/react-testing';

import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';

import {AnnotationContent, AnnotationContentProps} from './AnnotationContent';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

jest.mock('@shopify/polaris-viz-core/src/hooks', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/hooks'),
  useTheme: jest.fn(() => {
    return {
      annotations: {
        backgroundColor: 'red',
        textColor: 'red',
        titleColor: 'red',
        linkColor: 'red',
      },
    };
  }),
}));

const ANNOTATION = {
  label: '',
  startKey: 0,
  endKey: 0,
  content: {
    content: 'Some annotation content',
  },
};

const MOCK_PROPS: AnnotationContentProps = {
  annotation: ANNOTATION,
  drawableWidth: 300,
  index: 0,
  onMouseLeave: jest.fn(),
  parentRef: null,
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
  tabIndex: 1,
  theme: 'Default',
};

let svg;

jest.mock('../../../../hooks/useBrowserCheck', () => ({
  useBrowserCheck: jest.fn(() => {
    return {
      isFirefox: false,
    };
  }),
}));

describe('<AnnotationContent />', () => {
  // eslint-disable-next-line no-console
  const realError = console.error;

  beforeAll(() => {
    // Because AnnotationContent uses a portal to place
    // the content elsewhere, this test throws a warning because
    // foreignObject isn't in an SVG. This surpresses the warning
    // when running the tests.
    // eslint-disable-next-line no-console
    console.error = (...x) => {
      if (x[1] === 'foreignObject') {
        return;
      }
      realError(...x);
    };
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.error = realError;
  });

  beforeEach(() => {
    svg = document.createElement('svg');
    document.body.appendChild(svg);
  });

  afterEach(() => {
    document.body.removeChild(svg);
    svg = null;
  });

  it('renders a foreignObject', () => {
    const chart = mount(<AnnotationContent {...MOCK_PROPS} parentRef={svg} />);

    expect(chart).toContainReactComponent('foreignObject');
  });

  describe('annotation', () => {
    it('renders content', () => {
      const chart = mount(
        <AnnotationContent {...MOCK_PROPS} parentRef={svg} />,
      );

      expect(chart.find('p')).toContainReactText('Some annotation content');
    });

    it('renders a title when provided', () => {
      const chart = mount(
        <AnnotationContent
          {...MOCK_PROPS}
          annotation={{
            ...ANNOTATION,
            content: {
              content: 'Some annotation content',
              title: 'Content title',
            },
          }}
          parentRef={svg}
        />,
      );

      expect(chart.find('p')).toContainReactText('Content title');
    });

    it('renders a link when provided', () => {
      const chart = mount(
        <AnnotationContent
          {...MOCK_PROPS}
          annotation={{
            ...ANNOTATION,
            content: {
              content: 'Some annotation content',
              linkUrl: 'http://shopify.com',
            },
          }}
          parentRef={svg}
        />,
      );

      const link = chart.find('a');

      expect(link).toContainReactText('Learn more');
      expect(link?.prop('href')).toStrictEqual('http://shopify.com');
    });

    it('renders custom link text when provided', () => {
      const chart = mount(
        <AnnotationContent
          {...MOCK_PROPS}
          annotation={{
            ...ANNOTATION,
            content: {
              content: 'Some annotation content',
              linkText: 'Custom link text',
              linkUrl: 'http://shopify.com',
            },
          }}
          parentRef={svg}
        />,
      );

      expect(chart.find('a')).toContainReactText('Custom link text');
    });
  });

  it('renders background with opacity', () => {
    const chart = mount(<AnnotationContent {...MOCK_PROPS} parentRef={svg} />);

    expect(chart.find('div')?.prop('style')?.background).toStrictEqual(
      'rgba(255, 0, 0, 0.85)',
    );
  });

  it('renders full opacity background for Firefox', () => {
    useBrowserCheck.mockImplementation(() => ({isFirefox: true}));

    const chart = mount(<AnnotationContent {...MOCK_PROPS} parentRef={svg} />);

    expect(chart.find('div')?.prop('style')?.background).toStrictEqual(
      'rgb(255, 0, 0)',
    );
  });
});
