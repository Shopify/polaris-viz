import 'mutationobserver-shim';

// Mocks for scrolling
window.scroll = () => {};

const IGNORE_ERROR_REGEXES: any[] = [];

const IGNORE_WARN_REGEXES: any[] = [];

// eslint-disable-next-line no-console
const originalConsoleError = console.error.bind(console);
// eslint-disable-next-line no-console
console.error = (...args: any[]) => {
  const [firstArgument] = args;
  if (
    typeof firstArgument === 'string' &&
    IGNORE_ERROR_REGEXES.some((regex) => regex.test(firstArgument))
  ) {
    return;
  }

  originalConsoleError(...args);
};

// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn.bind(console);
// eslint-disable-next-line no-console
console.warn = (...args: any[]) => {
  const [firstArgument] = args;
  if (
    typeof firstArgument === 'string' &&
    IGNORE_WARN_REGEXES.some((regex) => regex.test(firstArgument))
  ) {
    return;
  }

  originalConsoleWarn(...args);
};
