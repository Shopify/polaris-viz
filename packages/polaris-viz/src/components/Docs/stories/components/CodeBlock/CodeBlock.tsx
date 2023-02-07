import type {ReactNode} from 'react';
import {Source} from '@storybook/addon-docs';

import styles from './CodeBlock.scss';

export function CodeBlock({children}: {children: ReactNode}) {
  return (
    <div className={styles.CodeBlock}>
      <Source dark language="jsx" code={children?.toString()} />
    </div>
  );
}
