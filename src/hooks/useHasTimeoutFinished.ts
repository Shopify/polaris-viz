import {useEffect, useRef, useState} from 'react';

export function useHasTimeoutFinished(time: number) {
  const [timeoutComplete, setTimeoutComplete] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (time <= 0) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setTimeoutComplete(true);
      window.clearTimeout(timeoutRef.current);
    }, time);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [time]);

  if (time <= 0) {
    return true;
  }

  return timeoutComplete;
}
