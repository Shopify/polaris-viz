import {mount} from '@shopify/react-testing';

import {useBrowserCheck} from '../useBrowserCheck';

describe('useBrowserCheck()', () => {
  Object.defineProperty(
    window.navigator,
    'userAgent',
    ((value) => ({
      get() {
        return value;
      },

      // eslint-disable-next-line id-length
      set(v) {
        // eslint-disable-next-line no-param-reassign
        value = v;
      },
    }))(window.navigator.userAgent),
  );

  it.each([
    {
      browser: 'chrome',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
      expected: {isChromium: true},
    },
    {
      browser: 'safari',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15',
      expected: {isSafari: true},
    },
    {
      browser: 'firefox',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
      expected: {isFirefox: true},
    },
  ])('returns $expected when userAgent: $browser', ({userAgent, expected}) => {
    global.navigator.userAgent = userAgent;

    function TestComponent() {
      const data = useBrowserCheck();

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      isChromium: false,
      isSafari: false,
      isFirefox: false,
      ...expected,
    });
  });
});
