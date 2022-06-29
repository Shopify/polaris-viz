import React from 'react';
import {Source} from '@storybook/addon-docs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {linkTo} from '@storybook/addon-links';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {classNames} from '../../../../../utilities';
import {useTheme} from '../../../../../hooks';

import styles from './ComponentContainer.scss';

export function ComponentContainer({
  chart,
  title,
  description,
  kind,
  center,
  theme = DEFAULT_THEME_NAME,
  codeSample,
}: {
  chart: JSX.Element;
  title?: string;
  description: string;
  kind: string;
  center?: boolean;
  theme?: string;
  codeSample?: string;
}) {
  const selectedTheme = useTheme(theme);

  const onlyHasCodeSample =
    !kind && !title && !description && Boolean(codeSample);

  const cardTopMarkup = (
    <React.Fragment>
      {title && (
        <h3 className={classNames(styles.Heading, kind && styles.Link)}>
          {title}
        </h3>
      )}
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
        className={classNames(styles.CardTop, kind ? styles.HasLink : '')}
        style={{
          // stylelint-disable-next-line value-keyword-case
          padding: onlyHasCodeSample ? '0px' : 'undefined',
        }}
      >
        {kind ? (
          <button onClick={linkTo(`${kind} + ${title}`, 'Default')}>
            {cardTopMarkup}
          </button>
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
