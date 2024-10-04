import {Fragment} from 'react';
import {FONT_FAMILY} from '@shopify/polaris-viz-core';

import {useTheme} from '../../hooks';
import {FONT_SIZE} from '../../constants';
import type {FormattedLine} from '../../types';

interface TextLineProps {
  index: number;
  line: FormattedLine[];
  color?: string;
  fontSize?: number;
}

export function TextLine({
  color,
  index,
  line,
  fontSize = FONT_SIZE,
}: TextLineProps) {
  const selectedTheme = useTheme();

  return (
    <Fragment>
      {line.map(
        (
          {
            dominantBaseline,
            height,
            fullText,
            truncatedText,
            textAnchor,
            transform,
            width,
            x,
            y,
          },
          textIndex,
        ) => {
          const key = `${index}-${textIndex}-${truncatedText}`;

          return (
            <Fragment key={key}>
              <text
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                height={height}
                width={width}
                x={x}
                y={y}
                fill={color ?? selectedTheme.xAxis.labelColor}
                fontSize={fontSize}
                fontFamily={FONT_FAMILY}
                transform={transform}
              >
                {truncatedText}
              </text>
              <title>{fullText}</title>
            </Fragment>
          );
        },
      )}
    </Fragment>
  );
}
