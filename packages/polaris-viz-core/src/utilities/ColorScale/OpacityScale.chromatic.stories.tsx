import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {OpacityScale} from './OpacityScale';
import {Hue} from '../../types';

export default {
  title: 'Chromatic/Utilities/OpacityScale',
  args: {
    theme: 'Light',
  },
} as Meta;

const Template: Story = (args) => {
  return (
    <>
      {[
        Hue.Teal,
        Hue.Blue,
        Hue.Indigo,
        Hue.Purple,
        Hue.Magenta,
        Hue.Orange,
        Hue.Yellow,
      ].map((hue) => {
        const scale = OpacityScale({
          hue,
          min: args.min,
          max: args.max,
        });

        return (
          <React.Fragment key={hue}>
            <p>
              <strong>{hue}</strong>
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {range(args.min, args.max).map((value, i) => {
                const styles = scale(value);
                console.log(styles, value);
                return (
                  <div
                    key={`${hue}-${i}`}
                    style={{
                      background: styles.backgroundColor,
                      color: styles.textColor,
                      height: 100,
                      width: 100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none',
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

function range(start, end) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

export const Default: Story = Template.bind({});
Default.args = {
  count: 10,
  min: 0,
  max: 13,
  multiplier: 1,
};

export const HighValues: Story = Template.bind({});
HighValues.args = {
  count: 14,
  min: 0,
  max: 100,
  multiplier: 10,
};
