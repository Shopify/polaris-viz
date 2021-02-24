import React from 'react';

import styles from './UpChevron.scss';

interface Props {
  accessibilityLabel: string;
}

export const UpChevron = ({accessibilityLabel}: Props) => (
  <svg
    aria-label={accessibilityLabel}
    className={styles.PositiveColouring}
    width="9"
    height="7"
    viewBox="0 0 9 7"
  >
    <path
      d="M3.708 1.03a1 1 0 011.584 0l3.165 4.11a1 1 0 01-.793 1.61H1.336a1 1 0 01-.793-1.61l3.165-4.11z"
      xmlns="http://www.w3.org/2000/svg"
    />
  </svg>
);
