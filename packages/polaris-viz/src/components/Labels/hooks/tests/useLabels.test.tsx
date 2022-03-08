import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useLabels, Props} from '../useLabels';

jest.mock('../../utilities/get-widest-truncated-width', () => {
  return {
    getWidestTruncatedWidth: () => 50,
  };
});

describe('useLabels()', () => {
  const onHeightChangeSpy = jest.fn();

  function TestComponent(props: Props) {
    const result = useLabels(props);
    return <div>{JSON.stringify(result)}</div>;
  }

  function getTransform(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text()).lines[0][0].transform;
  }

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns horizontal labels', () => {
    const mockComponent = mount(
      <TestComponent
        labels={['Sample string that will truncate']}
        targetWidth={100}
        onHeightChange={onHeightChangeSpy}
      />,
    );

    expect(getTransform(mockComponent)).toBeUndefined();
  });

  it('returns diagonal labels', () => {
    const mockComponent = mount(
      <TestComponent
        labels={['Sample string that will truncate']}
        targetWidth={45}
        onHeightChange={onHeightChangeSpy}
      />,
    );

    expect(getTransform(mockComponent)).toStrictEqual('rotate(-45)');
  });

  it('returns vertical labels', () => {
    const mockComponent = mount(
      <TestComponent
        labels={['Sample string that will truncate']}
        targetWidth={20}
        onHeightChange={onHeightChangeSpy}
      />,
    );

    expect(getTransform(mockComponent)).toStrictEqual(
      'translate(14) rotate(-90)',
    );
  });
});
