import {useContext} from 'react';

import {PolarisVizContext} from 'utilities';

export function usePolarisVizContext() {
  const context = useContext(PolarisVizContext);
  return context;
}
