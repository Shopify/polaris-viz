import React from 'react';
import {mount} from '@shopify/react-testing';

import {usePrevious} from '../usePrevious';

describe('usePrevious', () => {
  function TestComponent({prop}: {prop: string}) {
    const result = usePrevious(prop);
    return <div>{result == null ? 'undefined' : result}</div>;
  }

  it('returns undefined when there was no previous value', () => {
    const mockComponent = mount(<TestComponent prop="hello" />);
    expect(mockComponent.text()).toBe('undefined');
  });

  it('returns the previous value', () => {
    const mockComponent = mount(<TestComponent prop="hello" />);
    mockComponent.setProps({prop: 'again'});
    expect(mockComponent.text()).toBe('hello');
  });
});
