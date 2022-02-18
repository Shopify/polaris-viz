import {useContext} from 'react';

import {PolarisVizContext} from '../contexts/polaris-viz-context';

export function usePolarisVizContext() {
  const context = useContext(PolarisVizContext);
  return context;
}
