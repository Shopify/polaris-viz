import React from 'react';

import styles from './DownChevron.scss';

interface Props {
  accessibilityLabel: string;
  fill: string;
}

export function DownChevron({accessibilityLabel, fill}: Props) {
  return (
    <React.Fragment>
      <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      <svg
        xmlns={XMLNS}
        aria-hidden="true"
        style={{fill}}
        width="8"
        height="10"
        viewBox="0 0 8 10"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.4241 9.6244L7.4241 6.6244C7.6587 6.3898 7.6587 6.0106 7.4241 5.776C7.1895 5.5414 6.8103 5.5414 6.5757 5.776L4.5999 7.7518V0.800195C4.5999 0.468395 4.3317 0.200195 3.9999 0.200195C3.6681 0.200195 3.3999 0.468395 3.3999 0.800195V7.7518L1.4241 5.776C1.1895 5.5414 0.810302 5.5414 0.575702 5.776C0.458702 5.893 0.399902 6.0466 0.399902 6.2002C0.399902 6.3538 0.458702 6.5074 0.575702 6.6244L3.5757 9.6244C3.8103 9.859 4.1895 9.859 4.4241 9.6244Z"
        />
      </svg>
    </React.Fragment>
  );
}
