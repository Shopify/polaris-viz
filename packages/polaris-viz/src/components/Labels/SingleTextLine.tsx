import React, {useContext} from 'react';
import {ChartContext, LINE_HEIGHT} from '@shopify/polaris-viz-core';

import {FONT_SIZE} from '../../constants';

import {endLineTruncate} from './utilities/endLineTruncate';

interface SingleTextLineProps {
  color: string;
  targetWidth: number;
  text: string;
  x: number;
  y: number;
  ariaHidden?: boolean;
}

export function SingleTextLine({
  ariaHidden = false,
  color,
  targetWidth,
  text,
  y,
  x,
}: SingleTextLineProps) {
  const {characterWidths} = useContext(ChartContext);

  const truncated = endLineTruncate({
    label: text,
    targetWidth,
    targetHeight: LINE_HEIGHT,
    characterWidths,
  });

  return (
    <React.Fragment>
      <text
        aria-hidden={ariaHidden}
        textAnchor="center"
        dominantBaseline="hanging"
        height={LINE_HEIGHT}
        width={targetWidth}
        fill={color}
        fontSize={FONT_SIZE}
        y={y}
        x={x}
      >
        {truncated}
      </text>
      <title>{text}</title>
    </React.Fragment>
  );
}
