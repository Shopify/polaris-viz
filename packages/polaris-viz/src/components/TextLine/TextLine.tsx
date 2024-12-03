import {Fragment} from 'react';
import {FONT_FAMILY, useTheme} from '@shopify/polaris-viz-core';

import type {FormattedLine} from '../../types';

interface TextLineProps {
  index: number;
  line: FormattedLine[];
}

export function TextLine({index, line}: TextLineProps) {
  const selectedTheme = useTheme();

  return (
    <Fragment>
      {line.map(
        (
          {
            dominantBaseline,
            height,
            fontSize,
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
                fill={selectedTheme.xAxis.labelColor}
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
