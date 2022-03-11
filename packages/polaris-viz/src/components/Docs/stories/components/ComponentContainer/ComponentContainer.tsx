import React from 'react';
import {Source} from '@storybook/addon-docs';

import {classNames} from '../../../../../utilities';
import {useTheme} from '../../../../../hooks';

import styles from './ComponentContainer.scss';

export function ComponentContainer({
  chart,
  title,
  description,
  link,
  center,
  theme = 'Default',
  codeSample,
}: {
  chart: JSX.Element;
  title?: string;
  description: string;
  link?: string;
  center?: boolean;
  theme?: string;
  codeSample?: string;
}) {
  const selectedTheme = useTheme(theme);

  const onlyHasCodeSample =
    !link && !title && !description && Boolean(codeSample);

  const cardTopMarkup = (
    <React.Fragment>
      {title && <h3 className={styles.Heading}>{title}</h3>}
      <div className={styles.Paragraph}>
        {description}
        {codeSample && (
          <span
            className={classNames(
              onlyHasCodeSample ? styles.CodeSampleOnly : styles.CodeSample,
            )}
          >
            <Source dark language="jsx" code={codeSample} />
          </span>
        )}
      </div>
    </React.Fragment>
  );
  return (
    <div
      className={styles.Container}
      style={{
        // stylelint-disable-next-line value-keyword-case
        background: selectedTheme.chartContainer.backgroundColor,
      }}
    >
      <div
        className={classNames(styles.CardTop, link ? styles.HasLink : '')}
        style={{
          // stylelint-disable-next-line value-keyword-case
          padding: onlyHasCodeSample ? '0px' : 'undefined',
        }}
      >
        {link ? (
          <a className={styles.Link} href={link}>
            {cardTopMarkup}
          </a>
        ) : (
          cardTopMarkup
        )}
      </div>

      <div
        className={center ? styles.CenterChartContainer : styles.ChartContainer}
      >
        {chart}
      </div>
    </div>
  );
}
