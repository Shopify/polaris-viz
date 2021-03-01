import React from 'react';

import {getColorValue} from '../../../../utilities';

import styles from './UpChevron.scss';

interface Props {
  accessibilityLabel: string;
}

export function UpChevron({accessibilityLabel}: Props) {
  const fill = getColorValue('positive');
  return (
    <React.Fragment>
      <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      <svg
        aria-hidden="true"
        style={{fill}}
        width="8"
        height="10"
        viewBox="0 0 8 10"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.5999 9.2001V2.2485L6.5757 4.2243C6.8103 4.4589 7.1895 4.4589 7.4241 4.2243C7.6587 3.9897 7.6587 3.6105 7.4241 3.3759L4.4241 0.375901C4.1895 0.141301 3.8103 0.141301 3.5757 0.375901L0.575702 3.3759C0.458702 3.4929 0.399902 3.6465 0.399902 3.8001C0.399902 3.9537 0.458702 4.1073 0.575702 4.2243C0.810302 4.4589 1.1895 4.4589 1.4241 4.2243L3.3999 2.2485V9.2001C3.3999 9.5319 3.6681 9.8001 3.9999 9.8001C4.3317 9.8001 4.5999 9.5319 4.5999 9.2001Z"
        />
      </svg>
    </React.Fragment>
  );
}
