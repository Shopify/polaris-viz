import {createContext} from 'react';

interface Values {
  id: string | null;
}

export const ChartContext = createContext<Values>({id: null});
