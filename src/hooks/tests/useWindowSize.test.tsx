import React from 'react';
import {mount} from '@shopify/react-testing';
import {act} from 'react-dom/test-utils';

import {useWindowSize} from '../useWindowSize';

const TIMEOUT_DELAY = 1000;
const MOCK_WIDTH = 100;
const MOCK_HEIGHT = 200;

describe('useWindowSize', () => {
  const realWindow = {width: window.innerWidth, height: window.innerHeight};

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: realWindow.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: realWindow.height,
    });
  });

  function TestComponent() {
    const [width, height] = useWindowSize();
    return <React.Fragment>{`${width}-${height}`}</React.Fragment>;
  }

  it('provides the window width and height after resize', () => {
    jest.useFakeTimers();

    const component = mount(<TestComponent />);

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: MOCK_WIDTH,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: MOCK_HEIGHT,
      });
      window.dispatchEvent(new Event('resize'));
      jest.advanceTimersByTime(TIMEOUT_DELAY);
    });

    component.forceUpdate();

    expect(component.html()).toBe(`${MOCK_WIDTH}-${MOCK_HEIGHT}`);
  });
});
