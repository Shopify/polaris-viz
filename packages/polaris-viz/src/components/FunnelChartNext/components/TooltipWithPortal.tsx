import {createPortal} from 'react-dom';
import type {ReactNode} from 'react';

import {useRootContainer} from '../../../hooks/useRootContainer';
import {TOOLTIP_ID} from '../../../constants';

export function TooltipWithPortal({children}: {children: ReactNode}) {
  const container = useRootContainer(TOOLTIP_ID);

  return createPortal(children, container);
}
