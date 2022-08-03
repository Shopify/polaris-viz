import React from 'react';
import {FONT_SIZE, useTheme} from '@shopify/polaris-viz-core';

import {useLabels} from '../../../Labels/hooks';
import {TextLine} from '../../../TextLine';

const TEXT_DROP_SHADOW_SIZE = 3;

export function ErrorText({errorText, width, height}) {
  const {
    chartContainer: {backgroundColor},
  } = useTheme();

  const {lines} = useLabels({
    allowLineWrap: true,
    labels: [errorText],
    targetWidth: width,
    chartHeight: height,
  });

  return (
    <g
      style={{
        transform: `translateY(${height / 2 - FONT_SIZE * 2}px)`,
        filter: `
        drop-shadow( ${TEXT_DROP_SHADOW_SIZE}px 0px 1px ${backgroundColor})
        drop-shadow( -${TEXT_DROP_SHADOW_SIZE}px  0px 1px ${backgroundColor})
        drop-shadow( 0px ${TEXT_DROP_SHADOW_SIZE}px 1px ${backgroundColor})
        drop-shadow( 0px -${TEXT_DROP_SHADOW_SIZE}px 1px ${backgroundColor})
      `,
      }}
    >
      <TextLine index={0} line={lines[0]} />
    </g>
  );
}
