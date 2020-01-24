import {useLayoutEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

export function useWindowSize() {
  const [size, setWindowDimensions] = useState([0, 0]);
  const [debouncedCallback] = useDebouncedCallback(() => {
    setWindowDimensions([window.innerWidth, window.innerHeight]);
  }, 1000);

  useLayoutEffect(() => {
    window.addEventListener('resize', debouncedCallback);

    return () => window.removeEventListener('resize', debouncedCallback);
  }, [debouncedCallback]);
  return size;
}
