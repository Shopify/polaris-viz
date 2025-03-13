import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import type {Annotation} from '../../../types';
import {normalizeData} from '../../../utilities/normalizeData';
import type {AnnotationsProps} from '../Annotations';
import {Annotations} from '../Annotations';
import {
  AnnotationContent,
  AnnotationLabel,
  AnnotationLine,
  ShowMoreAnnotationsButton,
} from '../components';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

jest.mock('d3-scale', () => ({
  ...jest.requireActual('d3-scale'),
  scaleBand: jest.fn(() => {
    const scale = (value: any) => Number(value) * 100;
    scale.bandwidth = (width: any) => 100;
    return scale;
  }),
}));

jest.mock('@shopify/polaris-viz-core/src/hooks/useTheme', () => ({
  useTheme: jest.fn(() => {
    return {
      tooltip: {
        backgroundColor: 'red',
      },
      chartContainer: {
        backgroundColor: 'red',
      },
      annotations: {
        backgroundColor: 'red',
        textColor: 'red',
        titleColor: 'red',
        linkColor: 'red',
      },
    };
  }),
}));

const ANNOTATIONS: Annotation[] = [
  {
    axis: 'x',
    label: 'Annotation 1',
    startKey: 'Monday',
  },
  {
    axis: 'x',
    label: 'Annotation 2',
    startKey: 'Tuesday',
    content: {
      content: 'Hello Annotation',
    },
  },
  {
    axis: 'x',
    label: 'Annotation 3',
    startKey: 'Wednesday',
  },
];

const MOCK_PROPS: AnnotationsProps = {
  annotationsLookupTable: normalizeData(ANNOTATIONS, 'startKey'),
  axisLabelWidth: 50,
  drawableHeight: 200,
  drawableWidth: 600,
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  onHeightChange: jest.fn(),
  xScale: scaleBand(),
  labelFormatter: (value) => `${value}`,
  renderAnnotationContent: undefined,
};

describe('<Annotations />', () => {
  it('renders 3 annotations', () => {
    const component = mount(
      <svg>
        <Annotations {...MOCK_PROPS} />
      </svg>,
    );

    expect(component).toContainReactComponentTimes(AnnotationLabel, 3);
    expect(component).toContainReactComponentTimes(AnnotationLine, 3);
  });

  it('shows all annotations after <ShowMoreAnnotationsButton /> click', () => {
    const annotations = normalizeData(
      [
        {
          label: 'Annotation 1',
          startKey: 'Monday',
        },
        {
          label: 'Annotation 2',
          startKey: 'Tuesday',
        },
        {
          label: 'Annotation 3',
          startKey: 'Wednesday',
        },
        {
          label: 'Annotation 4',
          startKey: 'Thursday',
        },
        {
          label: 'Annotation 5',
          startKey: 'Friday',
        },
        {
          label: 'Annotation 6',
          startKey: 'Saturday',
        },
      ],
      'startKey',
    );

    const component = mount(
      <svg>
        <Annotations
          {...MOCK_PROPS}
          annotationsLookupTable={annotations}
          drawableWidth={200}
        />
      </svg>,
    );

    const showMoreButton = component.find(ShowMoreAnnotationsButton);

    expect(component).toContainReactComponentTimes(AnnotationLabel, 2);

    showMoreButton?.trigger('onClick');

    expect(component).toContainReactComponentTimes(AnnotationLabel, 6);
  });

  it('shows content for active annotation', () => {
    const component = mount(
      <svg>
        <Annotations {...MOCK_PROPS} />
      </svg>,
    );

    const labels = component.findAll(AnnotationLabel);

    labels[1].trigger('setActiveIndex', 1);

    expect(component).toContainReactComponent(AnnotationContent);
  });

  it('filters out y-axis annotations', () => {
    const annotationsLookupTable = normalizeData(
      [
        {
          label: 'Annotation 1',
          startKey: 'Monday',
        },
        {
          label: 'Annotation 2',
          startKey: 'Tuesday',
          axis: 'y',
        },
      ],
      'startKey',
    );

    const component = mount(
      <svg>
        <Annotations
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />
      </svg>,
    );

    expect(component).toContainReactComponentTimes(AnnotationLabel, 1);
  });

  it('does not render annotations with no matching key', () => {
    const annotationsLookupTable = normalizeData(
      [
        {
          label: 'Annotation 1',
          startKey: 'Monday',
        },
        {
          label: 'Bad Annotation',
          startKey: 'NoKey',
        },
      ],
      'startKey',
    );

    const component = mount(
      <svg>
        <Annotations
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />
      </svg>,
    );

    expect(component).toContainReactComponentTimes(AnnotationLabel, 1);
  });

  it('renders custom annotation content', () => {
    const component = mount(
      <svg>
        <Annotations
          {...MOCK_PROPS}
          renderAnnotationContent={() => <p>Custom content</p>}
        />
      </svg>,
    );

    const labels = component.findAll(AnnotationLabel);

    labels[1].trigger('setActiveIndex', 1);

    expect(component).toContainReactComponent(AnnotationContent, {
      renderAnnotationContent: expect.any(Function),
    });
  });
});
