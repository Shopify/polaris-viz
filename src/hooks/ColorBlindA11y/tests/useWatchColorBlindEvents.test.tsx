import React from 'react';

import {useWatchColorBlindEvents} from '../useWatchColorBlindEvents';
import {mountWithChartContext} from '../../../test-utilities/mount-with-chart-context';

describe('useWatchColorBlindEvents', () => {
  let events: {[key: string]: any} = {};

  beforeEach(() => {
    jest.useFakeTimers();

    events = {};

    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((event, callback) => {
        events[event] = callback;
      });

    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      delete events[event];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('does not attach events when no id provided', () => {
    function TestComponent() {
      useWatchColorBlindEvents({
        type: 'someType',
        onIndexChange: () => {},
      });

      return null;
    }

    mountWithChartContext(<TestComponent />, {id: null});

    expect(Object.keys(events)).toHaveLength(0);
  });

  it('attaches events to the window', () => {
    function TestComponent() {
      useWatchColorBlindEvents({
        type: 'someType',
        onIndexChange: () => {},
      });

      return null;
    }

    mountWithChartContext(<TestComponent />, {
      id: '123',
    });

    expect(Object.keys(events)).toHaveLength(1);
    expect(Object.keys(events)[0]).toStrictEqual(
      '123:color-blind-event:someType',
    );
  });

  it('responds to event', () => {
    const spy = jest.fn();

    function TestComponent() {
      useWatchColorBlindEvents({
        type: 'someType',
        onIndexChange: spy,
      });

      return null;
    }

    mountWithChartContext(<TestComponent />, {
      id: '123',
    });

    events['123:color-blind-event:someType']();

    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
  });
});
