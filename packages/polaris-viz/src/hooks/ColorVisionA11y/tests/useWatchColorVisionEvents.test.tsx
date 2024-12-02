import {mount} from '@shopify/react-testing';
import {useChartContext} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../useWatchColorVisionEvents';

const mockUseChartContext = useChartContext as jest.Mock;

describe('useWatchColorVisionEvents', () => {
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
      useWatchColorVisionEvents({
        type: 'someType',
        onIndexChange: () => {},
      });

      return null;
    }

    mount(<TestComponent />);

    expect(Object.keys(events)).toHaveLength(0);
  });

  it('attaches events to the window', () => {
    mockUseChartContext.mockReturnValue({
      ...mockUseChartContext(),
      id: '123',
    });

    function TestComponent() {
      useWatchColorVisionEvents({
        type: 'someType',
        onIndexChange: () => {},
      });

      return null;
    }

    mount(<TestComponent />);

    expect(Object.keys(events)).toHaveLength(1);
    expect(Object.keys(events)[0]).toStrictEqual(
      '123:color-vision-event:someType',
    );
  });

  it('responds to event', () => {
    mockUseChartContext.mockReturnValue({
      ...mockUseChartContext(),
      id: '123',
    });

    const spy = jest.fn();

    function TestComponent() {
      useWatchColorVisionEvents({
        type: 'someType',
        onIndexChange: spy,
      });

      return null;
    }

    mount(<TestComponent />);

    events['123:color-vision-event:someType']();

    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
  });
});
