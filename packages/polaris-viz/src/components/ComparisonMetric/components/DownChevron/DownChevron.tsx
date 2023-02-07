import { Fragment } from 'react';

import {XMLNS} from '../../../../constants';

import styles from './DownChevron.scss';

interface Props {
  accessibilityLabel: string;
  fill: string;
}

export function DownChevron({accessibilityLabel, fill}: Props) {
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
          d="M7.9856 -1.82341e-07L1.0144 -7.91783e-07C0.169527 -8.65644e-07 -0.303739 0.904212 0.21824 1.52112L3.70384 5.64066C4.10923 6.11978 4.89077 6.11978 5.29616 5.64066L8.78176 1.52113C9.30374 0.904213 8.83048 -1.0848e-07 7.9856 -1.82341e-07Z"
          fill="#F24F62"
        />
      </svg>
    </Fragment>
  );
}
