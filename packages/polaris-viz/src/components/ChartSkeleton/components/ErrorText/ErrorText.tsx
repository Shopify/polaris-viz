import {FONT_SIZE, useTheme} from '@shopify/polaris-viz-core';

import {useLabels} from '../../../Labels/hooks/useLabels';
import {TextLine} from '../../../TextLine/TextLine';

const TEXT_DROP_SHADOW_SIZE = 3;

interface ErrorTextProps {
  width: number;
  height: number;
  errorText: string;
}

export function ErrorText({errorText, width, height}: ErrorTextProps) {
  const {
    chartContainer: {backgroundColor},
  } = useTheme();

  const {lines} = useLabels({
    allowLineWrap: true,
    labels: [errorText],
    targetWidth: width,
  });

  return (
    <g
      style={{
        transform: `translateY(${Math.max(0, height / 2 - FONT_SIZE / 2)}px)`,
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
