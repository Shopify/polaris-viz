import {useEffect, useRef} from 'react';

export function usePrevious<Prop>(value: Prop): Prop | undefined {
  const ref = useRef<Prop>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
