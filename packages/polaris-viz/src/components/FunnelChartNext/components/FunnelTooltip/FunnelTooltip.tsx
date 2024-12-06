import type {ReactNode} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {FUNNEL_CONNECTOR_Y_OFFSET} from '../../constants';

import styles from './FunnelTooltip.scss';

export function FunnelTooltip({
  children,
  x,
  y,
}: {
  children: ReactNode;
  x: number;
  y: number;
}) {
  const {transform, opacity} = useSpring({
    from: {
      transform: `translate(${x}px, ${y + FUNNEL_CONNECTOR_Y_OFFSET}px)`,
      opacity: 0,
    },
    to: {
      transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
      opacity: 1,
    },
  });

  return (
    <animated.div className={styles.Tooltip} style={{transform, opacity}}>
      {children}
    </animated.div>
  );
}
