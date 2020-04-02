import {useLayoutEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

const ONE_SECOND = 1000;

export function useWindowSize() {
  const [size, setWindowDimensions] = useState([0, 0]);
  const [debouncedCallback] = useDebouncedCallback(() => {
    setWindowDimensions([window.innerWidth, window.innerHeight]);
  }, ONE_SECOND);

  useLayoutEffect(() => {
    window.addEventListener('resize', debouncedCallback);

    return () => window.removeEventListener('resize', debouncedCallback);
  }, [debouncedCallback]);
  return size;
}
