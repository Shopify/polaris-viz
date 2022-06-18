import {useRef} from 'react';

import {uniqueId} from '../utilities';

export function useUniqueId(slug: string) {
  const id = useRef(uniqueId(slug));
  return id.current;
}
