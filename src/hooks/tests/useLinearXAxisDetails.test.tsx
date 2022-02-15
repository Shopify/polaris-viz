import React from 'react';
import {mount} from '@shopify/react-testing';

import {LABEL_ELLIPSIS_LENGTH} from '../../constants';
import {useLinearXAxisDetails, ChartDetails} from '../useLinearXAxisDetails';

const MOCK_DIAGONAL_HEIGHT = 50;
const MOCK_ANGLED_LABEL_MAX_LENGTH = 100;

jest.mock('../../utilities', () => {
  return {
    ...jest.requireActual('../../utilities'),
    getTextWidth: () => 50,
    getTextContainerHeight: () => 42,
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
  const mockProps: ChartDetails = {
    data: [
      {
        data: [
          {value: 10000, key: 'Some label'},
          {value: 10, key: 'Some label'},
          {value: 10, key: 'Some label'},
          {value: 10, key: 'Some label'},
        ],
        name: 'Test series 1',
        color: 'colorGreen',
        lineStyle: 'dashed',
      },
    ] as any,
    fontSize: 14,
    width: 200,
    formatXAxisLabel: (label: string) => label,
    initialTicks: [{value: 10, formattedValue: '$10', yOffset: 100}],
    xAxisLabels: [
      'A really really long label A really really long label',
      'Another really really long label',
    ],
    wrapLabels: true,
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
            width: 300,
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
        (MOCK_ANGLED_LABEL_MAX_LENGTH + LABEL_ELLIPSIS_LENGTH).toString(),
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
      expect(actual).toContainReactText('45.4');
    });
  });

  describe('ticks', () => {
    function TicksTestComponent({props}: {props: ChartDetails}) {
      const {ticks} = useLinearXAxisDetails(props);

      return <p>{ticks.map((tick) => `${tick.toString()}/`)}</p>;
    }

    it('returns integers', () => {
      const actual = mount(
        <TicksTestComponent
          props={{
            ...mockProps,
          }}
        />,
      );
      expect(actual).toContainReactText('0/2');
    });

    it('provides three labels if useMinimalLabels is true and the longest series has at least three points', () => {
      const actual = mount(
        <TicksTestComponent
          props={{
            ...mockProps,
            useMinimalLabels: true,
            xAxisLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
            data: [
              {
                data: [
                  {value: 10000, key: 'Some label'},
                  {value: 10, key: 'Some label'},
                  {value: 10, key: 'Some label'},
                  {value: 10, key: 'Some label'},
                  {value: 10, key: 'Some label'},
                ],
                name: 'Test series 1',
                color: 'colorGreen',
                lineStyle: 'dashed',
              },
            ] as any,
            width: 800,
          }}
        />,
      );

      expect(actual).toContainReactText('0/2/4');
    });
  });
});
