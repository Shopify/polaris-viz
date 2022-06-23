import {useRef, useEffect} from 'react';

export function useComponentDidMount(onMountHandler?: (...args: any) => any) {
  const didMount = useRef(false);
  useEffect(() => {
    if (onMountHandler) onMountHandler();
    setTimeout(() => {
      didMount.current = true;
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return didMount.current;
}
