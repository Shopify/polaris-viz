import React, {CSSProperties, useMemo} from 'react';

import {uniqueId} from '../../../../../utilities';
import {copyTextToClipboard} from '../../../utilities';

import styles from './Title.scss';

export function Title({
  type = 'h1',
  children,
  style = {},
}: {
  type: string;
  children: React.ReactChildren;
  style: CSSProperties;
}) {
  const id = useMemo(() => uniqueId('titleAnchor'), []);

  const markup = useMemo(() => {
    switch (type) {
      case 'h1':
        return <h1 className={styles.h2}>{children}</h1>;
      case 'h2':
        return <h2 className={styles.h2}>{children}</h2>;
      case 'h3':
        return <h3 className={styles.h3}>{children}</h3>;
      case 'h4':
        return <h4 className={styles.h4}>{children}</h4>;
      default:
        return children;
    }
  }, [children, type]);

  const handleInteraction = (event: any) => {
    event.preventDefault();
    const url = `${window.location.href}#${id}`.replace(
      'iframe.html?id=',
      '?path=/docs/',
    );
    copyTextToClipboard(url);
  };
  return (
    <a
      className={styles.TitleAnchor}
      id={id}
      href={`#${id}`}
      onClick={handleInteraction}
      style={style}
    >
      {markup}
    </a>
  );
}
