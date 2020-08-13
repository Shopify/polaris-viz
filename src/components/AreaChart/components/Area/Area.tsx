import React from 'react';

import {AREA_OPACITY} from '../../constants';

interface Props {
  shape: string;
  fill: string;
}

export function Area({shape, fill}: Props) {
  return <path opacity={AREA_OPACITY} d={shape} fill={fill} />;
}
