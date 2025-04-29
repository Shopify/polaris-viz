import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import type {Annotation} from '../../../types';
import {normalizeData} from '../../../utilities/normalizeData';
import type {YAxisAnnotationsProps} from '../YAxisAnnotations';
import {YAxisAnnotations} from '../YAxisAnnotations';
import {
  AnnotationContent,
  AnnotationLabel,
  AnnotationLine,
} from '../components';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
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
    label: 'Annotation 1',
    startKey: '0.1',
    axis: 'y',
  },
  {
    label: 'Annotation 2',
    startKey: '0.2',
    axis: 'y',
    content: {
      content: 'Hello Annotation',
    },
  },
  {
    label: 'Annotation 3',
    startKey: '0.3',
    axis: 'y',
  },
];

const MOCK_PROPS: YAxisAnnotationsProps = {
  annotationsLookupTable: normalizeData(ANNOTATIONS, 'startKey'),
  drawableHeight: 200,
  drawableWidth: 600,
  ticks: [
    {value: 0, formattedValue: '0', yOffset: 0},
    {value: 10, formattedValue: '10', yOffset: 10},
    {value: 20, formattedValue: '20', yOffset: 20},
    {value: 30, formattedValue: '30', yOffset: 30},
    {value: 40, formattedValue: '40', yOffset: 40},
  ],
  yScale: scaleLinear(),
};

describe('<YAxisAnnotations />', () => {
  it('renders 3 annotations', () => {
    const component = mount(
      <svg>
        <YAxisAnnotations {...MOCK_PROPS} />
      </svg>,
    );

    expect(component).toContainReactComponentTimes(AnnotationLabel, 3);
    expect(component).toContainReactComponentTimes(AnnotationLine, 3);
  });

  it('shows content for active annotation', () => {
    const component = mount(
      <svg>
        <YAxisAnnotations {...MOCK_PROPS} />
      </svg>,
    );

    const labels = component.findAll(AnnotationLabel);

    labels[1].trigger('onMouseEnter', 1);

    expect(component).toContainReactComponent(AnnotationContent);
  });

  it('filters out x-axis annotations', () => {
    const annotationsLookupTable = normalizeData(
      [
        {
          label: 'Annotation 1',
          startKey: '0.1',
        },
        {
          label: 'Annotation 2',
          startKey: '0.2',
          axis: 'y',
        },
      ],
      'startKey',
    );

    const component = mount(
      <svg>
        <YAxisAnnotations
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
          startKey: '0.1',
          axis: 'y',
        },
        {
          label: 'Bad Annotation',
          startKey: '20',
          axis: 'y',
        },
      ],
      'startKey',
    );

    const component = mount(
      <svg>
        <YAxisAnnotations
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />
      </svg>,
    );

    expect(component).toContainReactComponentTimes(AnnotationLabel, 1);
  });
});
