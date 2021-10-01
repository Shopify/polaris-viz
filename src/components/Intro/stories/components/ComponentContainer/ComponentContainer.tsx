import React from 'react';

import styles from './ComponentContainer.scss';

export function ComponentContainer({
  chart,
  title,
  description,
  link,
  center,
}: {
  chart: React.Component;
  title: string;
  description: string;
  link: string;
  center?: boolean;
}) {
  return (
    <div className={styles.Container}>
      <a className={styles.Link} href={link}>
        <div className={styles.CardTop}>
          <h3 className={styles.Heading}>{title}</h3>
          <p className={styles.Paragraph}>{description}</p>
        </div>
      </a>

      <div
        className={center ? styles.CenterChartContainer : styles.ChartContainer}
      >
        {chart}
      </div>
    </div>
  );
}
