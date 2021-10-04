import React, {useMemo} from 'react';

import {copyTextToClipboard} from '../../../../../../documentation/utilities';

import styles from './Title.scss';

export function Title({
  type = 'h1',
  children,
}: {
  type: string;
  children: React.ReactChildren;
}) {
  const slug = children.toString().replace(/\s/g, '');

  const markup = useMemo(() => {
    switch (type) {
      case 'h1':
        return <h1 className={styles.h2}>{children}</h1>;
        break;
      case 'h2':
        return <h2 className={styles.h2}>{children}</h2>;
        break;
      case 'h3':
        return <h3 className={styles.h3}>{children}</h3>;
        break;

      default:
        return children;
        break;
    }
  }, [children, type]);

  const handleInteraction = (event: any) => {
    event.preventDefault();
    const url = `${window.location.href}#${slug}`.replace(
      'iframe.html?id=',
      '?path=/docs/',
    );
    copyTextToClipboard(url);
  };
  return (
    <a
      className={styles.TitleAnchor}
      id={slug}
      href={`#${slug}`}
      onClick={handleInteraction}
    >
      {markup}
    </a>
  );
}
