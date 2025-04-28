import {Fragment} from 'react';
import {
  FONT_FAMILY,
  LINE_HEIGHT,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {endLineTruncate} from './utilities/endLineTruncate';

interface SingleTextLineProps {
  color: string;
  fontSize: number;
  fontWeight?: number;
  targetWidth: number;
  text: string;
  x?: number;
  y?: number;
  ariaHidden?: boolean;
  dominantBaseline?: 'middle' | 'hanging';
  textAnchor?: 'start' | 'middle' | 'end';
}

const DEFAULT_LABEL_FONT_WEIGHT = 400;

export function SingleTextLine({
  ariaHidden = false,
  color,
  dominantBaseline = 'hanging',
  fontSize,
  fontWeight = DEFAULT_LABEL_FONT_WEIGHT,
  targetWidth,
  text,
  textAnchor = 'middle',
  y = 0,
  x = 0,
}: SingleTextLineProps) {
  const {characterWidths} = useChartContext();

  const truncated = endLineTruncate({
    label: text,
    targetWidth,
    targetHeight: LINE_HEIGHT,
    characterWidths,
  });

  const isStringTruncated = truncated !== text;

  return (
    <Fragment>
      <text
        aria-hidden={ariaHidden}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        height={LINE_HEIGHT}
        width={targetWidth}
        fill={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={FONT_FAMILY}
        y={y}
        x={x}
      >
        {truncated}
      </text>
      {isStringTruncated && <title>{text}</title>}
    </Fragment>
  );
}
