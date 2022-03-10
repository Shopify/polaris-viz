import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useMinimalLabelIndexes, Props} from '../use-minimal-label-indexes';

describe('useMinimalLabelIndexes', () => {
  function TestComponent(props: Props) {
    const {minimalLabelIndexes} = useMinimalLabelIndexes(props);
    return <div>{JSON.stringify(minimalLabelIndexes)}</div>;
  }

  function parseResult(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text());
  }

  it('returns empty array when useMinimalLabels is false', () => {
    const mockComponent = mount(
      <TestComponent dataLength={10} useMinimalLabels={false} />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([]);
  });

  it('returns empty array when the data length is less than 2', () => {
    const mockComponent = mount(
      <TestComponent dataLength={2} useMinimalLabels={false} />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([]);
  });

  it('returns the first and last indexes when the dataLength is even and less than 10', () => {
    const mockComponent = mount(
      <TestComponent dataLength={8} useMinimalLabels />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([0, 7]);
  });

  it('includes a middle index when the dataLength is odd and less than 10', () => {
    const mockComponent = mount(
      <TestComponent dataLength={9} useMinimalLabels />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([0, 4, 8]);
  });

  it('includes a middle index when the dataLength is even and more than 10', () => {
    const mockComponent = mount(
      <TestComponent dataLength={12} useMinimalLabels />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([0, 6, 11]);
  });

  describe('dropLabelsForWidth', () => {
    it('drops labels to fit container width when true', () => {
      const mockComponent = mount(
        <TestComponent
          dataLength={700}
          useMinimalLabels={false}
          dropLabelsForWidth
        />,
      );

      const result = parseResult(mockComponent);

      expect(result).toHaveLength(16);
    });

    it('is ignored if useMinimalLabels us true', () => {
      const mockComponent = mount(
        <TestComponent dataLength={12} useMinimalLabels dropLabelsForWidth />,
      );

      expect(parseResult(mockComponent)).toStrictEqual([0, 6, 11]);
    });
  });
});
