import {mount} from '@shopify/react-testing';
import {COLOR_VISION_SINGLE_ITEM} from '@shopify/polaris-viz-core';

import {
  useWatchActiveSeries,
  setActiveSeriesListener,
} from '../useWatchActiveSeries';
import {getEventName} from '../ColorVisionA11y/utilities';
import {useCallbackRef} from '../useCallbackRef';

jest.mock('../useCallbackRef');

const mockUseCallbackRef = useCallbackRef as jest.MockedFunction<
  typeof useCallbackRef
>;

const onIndexChangeCallback = jest.fn();

describe('useWatchActiveSeries()', () => {
  beforeEach(() => {
    mockUseCallbackRef.mockReturnValue(onIndexChangeCallback);
  });

  afterEach(() => {
    mockUseCallbackRef.mockReset();
  });

  describe('useWatchActiveSeries()', () => {
    it('attaches event listener to window when id is passed', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      function MockComponent() {
        useWatchActiveSeries('id', onIndexChangeCallback);

        return null;
      }

      mount(<MockComponent />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'id:color-vision-event:singleItem',
        onIndexChangeCallback,
      );
    });

    it('removes event listener from window when component is unmounted', () => {
      const onIndexChangeCallback = jest.fn();
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      mockUseCallbackRef.mockReturnValue(onIndexChangeCallback);

      function MockComponent() {
        useWatchActiveSeries('id', onIndexChangeCallback);

        return null;
      }

      const component = mount(<MockComponent />);

      component.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'id:color-vision-event:singleItem',
        onIndexChangeCallback,
      );
    });
  });

  describe('setActiveSeriesListener()', () => {
    it('adds an event listener using an event name generated using the given ID', () => {
      const id = getEventName('someChartId', COLOR_VISION_SINGLE_ITEM);
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      setActiveSeriesListener('someChartId', onIndexChangeCallback);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        id,
        onIndexChangeCallback,
      );
    });

    it('returns a method that removes the previously set event listener', () => {
      const id = getEventName('someChartId', COLOR_VISION_SINGLE_ITEM);
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      setActiveSeriesListener('someChartId', onIndexChangeCallback);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        id,
        onIndexChangeCallback,
      );
    });
  });
});
