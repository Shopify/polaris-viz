import React from 'react';

import styles from './DownChevron.scss';

interface Props {
  accessibilityLabel: string;
}

export const DownChevron = ({accessibilityLabel}: Props) => (
  <svg
    aria-label={accessibilityLabel}
    className={styles.NegativeColouring}
    width="10"
    height="7"
    viewBox="0 0 10 6"
  >
    <path
      d="M5.792 5.97a1 1 0 01-1.584 0L1.043 1.86A1 1 0 011.836.25h6.328a1 1 0 01.793 1.61L5.792 5.97z"
      xmlns="http://www.w3.org/2000/svg"
    />
  </svg>
);
