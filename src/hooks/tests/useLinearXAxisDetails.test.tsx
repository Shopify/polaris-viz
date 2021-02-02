import React from 'react';
import {mount} from '@shopify/react-testing';

import {useLinearXAxisDetails, ChartDetails} from '../useLinearXAxisDetails';

const MOCK_DIAGONAL_HEIGHT = 50;
const MOCK_ANGLED_LABEL_MAX_LENGTH = 100;

jest.mock('../../utilities', () => {
  return {
    ...jest.requireActual('../../utilities'),
    getTextWidth: () => 10,
    getTextContainerHeight: () => 45,
    getMaxDiagonalDetails: () => {
      return {
        angledLabelMaxLength: MOCK_ANGLED_LABEL_MAX_LENGTH,
        maxDiagonalLabelHeight: MOCK_DIAGONAL_HEIGHT,
      };
    },
    getLongestLabelDetails: () => {
      return {
        label: 'some long label ',
        length: 200,
      };
    },
  };
});

describe('useLinearXAxisDetails', () => {
  const mockProps = {
    series: [
      {
        data: [
          {rawValue: 10000, label: 'Some label'},
          {rawValue: 10, label: 'Some label'},
        ],
        name: 'Test series 1',
        color: 'colorGreen',
        lineStyle: 'dashed',
      },
    ] as any,
    fontSize: 14,
    chartDimensions: {width: 100} as any,
    formatXAxisLabel: (label: string) => label,
    formatYAxisLabel: (label: number) => label.toString(),
    xAxisLabels: [
      'A really really long label A really really long label',
      'Another really really long label',
    ],
  };

  describe('needsDiagonalLabels', () => {
    function DiagonalTestComponent({props}: {props: ChartDetails}) {
      const {needsDiagonalLabels} = useLinearXAxisDetails(props);

      return <p>{needsDiagonalLabels.toString()}</p>;
    }

    it('returns diagonal labels true when the longest label would overflow', () => {
      const actual = mount(<DiagonalTestComponent props={{...mockProps}} />);
      expect(actual).toContainReactText('true');
    });

    it('returns diagonal labels false when the longest label will not overflow', () => {
      const actual = mount(
        <DiagonalTestComponent
          props={{
            ...mockProps,
            chartDimensions: {...mockProps.chartDimensions, width: 300},
          }}
        />,
      );
      expect(actual).toContainReactText('false');
    });
  });

  describe('maxXLabelHeight', () => {
    function HeightTestComponent({props}: {props: ChartDetails}) {
      const {maxXLabelHeight} = useLinearXAxisDetails(props);

      return <p>{maxXLabelHeight.toString()}</p>;
    }

    it('is returned', () => {
      const actual = mount(
        <HeightTestComponent
          props={{
            ...mockProps,
          }}
        />,
      );
      expect(actual).toContainReactText(MOCK_DIAGONAL_HEIGHT.toString());
    });
  });

  describe('maxDiagonalLabelLength', () => {
    function MaxDiagonalTestComponent({props}: {props: ChartDetails}) {
      const {maxDiagonalLabelLength} = useLinearXAxisDetails(props);

      return <p>{maxDiagonalLabelLength.toString()}</p>;
    }

    it('is returned', () => {
      const actual = mount(
        <MaxDiagonalTestComponent
          props={{
            ...mockProps,
          }}
        />,
      );
      expect(actual).toContainReactText(
        MOCK_ANGLED_LABEL_MAX_LENGTH.toString(),
      );
    });
  });

  describe('horizontalLabelWidth', () => {
    function MaxWidthComponent({props}: {props: ChartDetails}) {
      const {horizontalLabelWidth} = useLinearXAxisDetails(props);

      return <p>{horizontalLabelWidth.toString()}</p>;
    }

    it('is returned', () => {
      const actual = mount(
        <MaxWidthComponent
          props={{
            ...mockProps,
          }}
        />,
      );
      expect(actual).toContainReactText('15.7');
    });
  });

  describe('ticks', () => {
    function TicksTestComponent({props}: {props: ChartDetails}) {
      const {ticks} = useLinearXAxisDetails(props);

      return <p>{ticks.map((tick) => `${tick.toString()}/`)}</p>;
    }

    it('is returned', () => {
      const actual = mount(
        <TicksTestComponent
          props={{
            ...mockProps,
          }}
        />,
      );
      expect(actual).toContainReactText('0/0.3/0.6/0.9');
    });
  });
});
