import {Fragment} from 'react';

import {XMLNS} from '../../../../constants';

import styles from './UpChevron.scss';

interface Props {
  accessibilityLabel: string;
  fill: string;
}

export function UpChevron({accessibilityLabel, fill}: Props) {
  return (
    <Fragment>
      <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      <svg
        xmlns={XMLNS}
        aria-hidden="true"
        style={{fill}}
        width="9"
        height="6"
        viewBox="0 0 9 6"
      >
        <path
          d="M1.0144 6H7.9856C8.83047 6 9.30374 5.09579 8.78176 4.47887L5.29616 0.359336C4.89077 -0.119779 4.10923 -0.119779 3.70384 0.359336L0.218239 4.47887C-0.30374 5.09579 0.169525 6 1.0144 6Z"
          fill="#039C86"
        />
      </svg>
    </Fragment>
  );
}
