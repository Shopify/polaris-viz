import type {ReactNode} from 'react';

import styles from './SkipLink.scss';

interface SkipLinkProps {
  children: ReactNode;
  anchorId: string;
}

export const SkipLink = ({children, anchorId}: SkipLinkProps) => {
  return (
    <a className={styles.SkipLink} href={`#${anchorId}`}>
      {children}
    </a>
  );
};

// eslint-disable-next-line jsx-a11y/anchor-is-valid
const Anchor = ({id}: {id: string}) => <a id={id} tabIndex={-1} />;

SkipLink.Anchor = Anchor;
