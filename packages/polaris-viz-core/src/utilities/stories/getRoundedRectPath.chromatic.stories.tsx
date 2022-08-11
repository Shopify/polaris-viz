import React from 'react';
import {storiesOf} from '@storybook/react';
import {getRoundedRectPath} from '../getRoundedRectPath';

const DIMENSIONS = {
  horizontal: [
    {
      height: 5,
      width: 100,
    },
    {
      height: 20,
      width: 100,
    },
  ],
  vertical: [
    {
      height: 100,
      width: 5,
    },
    {
      height: 100,
      width: 10,
    },
  ],
};

const RADIUS_CASES = [
  '0 0 0 0',
  '2 0 0 0',
  '2 2 0 0',
  '2 2 2 0',
  '2 2 2 2',
  '0 0 0 2',
  '0 0 2 2',
  '0 2 2 2',
  '0 2 0 2',
  '2 0 2 0',
  '0 2 2 0',
];

const BORDER_RADIUS = [2, 5, 100];

const DIRECTIONS = ['horizontal', 'vertical'];

DIRECTIONS.forEach((direction) => {
  const stories = storiesOf(
    `Chromatic/Utilities/getRoundedRectPath`,
    module,
  ).addParameters({chromatic: {disableSnapshot: false}});

  stories.add(direction, () => {
    return (
      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {BORDER_RADIUS.map((borderRadius) => {
          return RADIUS_CASES.map((radiusCase) => {
            const borderRadiusString = radiusCase.replace(
              /2/g,
              `${borderRadius}`,
            );

            return (
              <div>
                <p>
                  <strong>{borderRadiusString}</strong>
                </p>
                <div style={{display: 'flex', gap: 10}}>
                  {Object.values(DIMENSIONS[direction]).map(
                    ({height, width}) => {
                      return (
                        <svg height={height} width={width}>
                          <path
                            d={getRoundedRectPath({
                              height,
                              width,
                              borderRadius: borderRadiusString,
                            })}
                            height={height}
                            width={width}
                            fill="red"
                          />
                        </svg>
                      );
                    },
                  )}
                </div>
              </div>
            );
          });
        })}
      </div>
    );
  });
});
