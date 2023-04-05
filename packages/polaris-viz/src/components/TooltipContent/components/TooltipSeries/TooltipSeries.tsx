import type {ReactNode} from 'react';

import styles from './TooltipSeries.scss';

interface Props {
  children: ReactNode;
  isEmpty?: boolean;
}

export function TooltipSeries({children, isEmpty = false}: Props) {
  if (isEmpty) {
    return null;
  }

  return <div className={styles.Series}>{children}</div>;
}
