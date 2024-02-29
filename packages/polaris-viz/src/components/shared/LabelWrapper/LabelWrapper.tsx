import {animated, useSpring} from '@react-spring/web';
import type {ReactNode} from 'react';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

interface Props {
  animationDelay: number;
  children: ReactNode;
  x: number;
}

export function LabelWrapper({animationDelay, children, x}: Props) {
  const springConfig = useBarSpringConfig({animationDelay});

  const spring = useSpring({
    from: {transform: 'translateX(0px)', opacity: 0},
    to: {opacity: 1, transform: `translateX(${x}px)`},
    ...springConfig,
  });

  return (
    // animating the foreignObject does not work on Safari,
    // so we need to use a g instead
    <animated.g
      style={{
        opacity: spring.opacity,
        transform: spring.transform,
      }}
    >
      {children}
    </animated.g>
  );
}
