import React from 'react';
import {animated, useSpring} from 'react-spring';

import {AREA_OPACITY} from '../../constants';

interface Props {
  shape: string;
  fill: string;
  zeroShape: string;
}

export function Area({shape, fill, zeroShape}: Props) {
  const spring = useSpring({
    shape,
    from: {
      shape: zeroShape,
    },
  });

  return <animated.path opacity={AREA_OPACITY} d={spring.shape} fill={fill} />;
}
