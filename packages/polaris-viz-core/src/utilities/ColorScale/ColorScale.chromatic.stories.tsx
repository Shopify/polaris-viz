import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {ColorScale} from './ColorScale';
import {Hue} from '../../types';

export default {
  title: 'Chromatic/Utilities/ColorScale',
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
        const scale = ColorScale({
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
              {new Array(args.count).fill(null).map((_, i) => {
                const styles = scale(i * args.multiplier);
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
                    {i * args.multiplier}
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

export const Default: Story = Template.bind({});
Default.args = {
  multiplier: 1,
  count: 17,
  min: 0,
  max: 16,
};

export const MinMax: Story = Template.bind({});
MinMax.args = {
  multiplier: 1,
  count: 10,
  min: 2,
  max: 7,
};

export const HighValues: Story = Template.bind({});
HighValues.args = {
  count: 14,
  min: 0,
  max: 100,
  multiplier: 10,
};
