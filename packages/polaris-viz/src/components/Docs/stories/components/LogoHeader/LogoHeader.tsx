import React from 'react';

import {PolarisVizLogo} from './images';
import styles from './LogoHeader.scss';

export function LogoHeader() {
  const alt = 'Polaris Viz logo';
  return (
    <div className={styles.Container}>
      <img className={styles.ChartLogo} src={PolarisVizLogo} alt={alt} />
    </div>
  );
}
