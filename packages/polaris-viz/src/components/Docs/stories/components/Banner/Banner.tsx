import type {ReactNode} from 'react';

import styles from './Banner.scss';

export function Banner({
  type = 'Alert',
  children,
}: {
  type: 'Alert' | 'Info';
  children: ReactNode;
}) {
  return <div className={`${styles.Banner} ${styles[type]}`}>{children}</div>;
}
