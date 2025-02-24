import {useRef} from 'react';

export const useRootContainer = (id: string): HTMLElement => {
  const ref = useRef<HTMLElement | null>(document.getElementById(id));

  function getRootElem(): HTMLElement {
    if (!ref.current) {
      ref.current = document.createElement('div');
      ref.current.id = id;
      ref.current.style.overflow = 'hidden';

      document.body.appendChild(ref.current);
    }
    return ref.current;
  }

  return getRootElem();
};
