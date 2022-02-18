import {useEffect, useRef} from 'react';

export function usePrevious<Prop>(value: Prop): Prop | undefined {
  const ref = useRef<Prop>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
