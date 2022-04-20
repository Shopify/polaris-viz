import {useContext} from 'react';

import {PolarisVizContext} from '../contexts/PolarisVizContext';

export function usePolarisVizContext() {
  const context = useContext(PolarisVizContext);
  return context;
}
