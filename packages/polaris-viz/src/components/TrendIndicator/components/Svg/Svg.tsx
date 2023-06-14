import type {ReactNode} from 'react';

import styles from './Svg.scss';

interface Props {
  children: ReactNode;
  height: number;
  width: number;
  accessibilityLabel?: string;
  tabIndex?: number;
}

export function Svg({
  accessibilityLabel,
  children,
  height,
  width,
  tabIndex = 0,
}: Props) {
  const hasLabel = accessibilityLabel != null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
      role={hasLabel ? 'img' : undefined}
      className={styles.SVG}
      tabIndex={tabIndex}
    >
      {hasLabel && <title>{accessibilityLabel}</title>}
      {children}
    </svg>
  );
}
