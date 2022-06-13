import React from 'react';
import {mount, Root} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {useAnnotationPositions, Props} from '../useAnnotationPositions';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 50),
}));

jest.mock('d3-scale', () => ({
  ...jest.requireActual('d3-scale'),
  scaleBand: jest.fn(() => {
    const scale = (value: any) => Number(value) * 50;
    scale.bandwidth = (width: any) => 50;
    return scale;
  }),
}));

const MOCK_PROPS: Props = {
  annotations: [],
  axisLabelWidth: 50,
  dataIndexes: {
    key1: '0',
    key2: '1',
    key3: '2',
  },
  drawableWidth: 1000,
  isShowingAllAnnotations: false,
  onHeightChange: jest.fn(),
  xScale: scaleBand(),
};

describe('useAnnotationPositions', () => {
  function TestComponent(props: Props) {
    const {positions, rowCount} = useAnnotationPositions(props);
    return <div>{JSON.stringify({positions, rowCount})}</div>;
  }

  function parseResult(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text());
  }

  beforeEach(() => {
    (MOCK_PROPS.onHeightChange as jest.MockedFunction<any>).mockClear();
  });

  it('places annotations on a new row when overlapping', () => {
    const mockComponent = mount(
      <TestComponent
        {...MOCK_PROPS}
        drawableWidth={100}
        annotations={[
          {label: 'Annotation 1', startKey: 'key0'},
          {label: 'Annotation 2', startKey: 'key1'},
          {label: 'Annotation 3', startKey: 'key2'},
        ]}
      />,
    );

    const result = parseResult(mockComponent);

    expect(result.positions[0].row).toStrictEqual(1);
    expect(result.positions[1].row).toStrictEqual(1);
    expect(result.positions[2].row).toStrictEqual(2);
  });

  it('keeps annotations on the same row if they do not overlap', () => {
    const mockComponent = mount(
      <TestComponent
        {...MOCK_PROPS}
        annotations={[
          {label: 'Annotation 1', startKey: 'key0'},
          {label: 'Annotation 2', startKey: 'key1'},
          {label: 'Annotation 3', startKey: 'key2'},
        ]}
      />,
    );

    const result = parseResult(mockComponent);

    expect(result.positions[0].row).toStrictEqual(1);
    expect(result.positions[1].row).toStrictEqual(1);
    expect(result.positions[2].row).toStrictEqual(2);
  });

  describe('onHeightChange', () => {
    it('calls onHeightChange whenever the number of rows change', () => {
      const mockComponent = mount(
        <TestComponent
          {...MOCK_PROPS}
          drawableWidth={10}
          annotations={[
            {label: 'Annotation 1', startKey: 'key0'},
            {label: 'Annotation 2', startKey: 'key1'},
          ]}
        />,
      );

      expect(MOCK_PROPS.onHeightChange).toHaveBeenCalledTimes(1);
      expect(MOCK_PROPS.onHeightChange).toHaveBeenLastCalledWith(28);

      mockComponent.setProps({
        annotations: [
          {label: 'Annotation 1', startKey: 'key0'},
          {label: 'Annotation 2', startKey: 'key1'},
          {label: 'Annotation 3', startKey: 'key2'},
        ],
      });

      expect(MOCK_PROPS.onHeightChange).toHaveBeenCalledTimes(2);
      expect(MOCK_PROPS.onHeightChange).toHaveBeenLastCalledWith(56);
    });
  });

  describe('isShowingAllAnnotations', () => {
    it('returns all values when true', () => {
      mount(
        <TestComponent
          {...MOCK_PROPS}
          isShowingAllAnnotations
          drawableWidth={10}
          annotations={[
            {label: 'Annotation 1', startKey: 'key0'},
            {label: 'Annotation 2', startKey: 'key1'},
            {label: 'Annotation 3', startKey: 'key2'},
            {label: 'Annotation 4', startKey: 'key3'},
            {label: 'Annotation 5', startKey: 'key4'},
            {label: 'Annotation 6', startKey: 'key5'},
          ]}
        />,
      );

      expect(MOCK_PROPS.onHeightChange).toHaveBeenLastCalledWith(111);
    });

    it('returns limited value when false', () => {
      mount(
        <TestComponent
          {...MOCK_PROPS}
          drawableWidth={10}
          annotations={[
            {label: 'Annotation 1', startKey: 'key0'},
            {label: 'Annotation 2', startKey: 'key1'},
            {label: 'Annotation 3', startKey: 'key2'},
            {label: 'Annotation 4', startKey: 'key3'},
            {label: 'Annotation 5', startKey: 'key4'},
            {label: 'Annotation 6', startKey: 'key5'},
          ]}
        />,
      );

      expect(MOCK_PROPS.onHeightChange).toHaveBeenLastCalledWith(84);
    });
  });
});
