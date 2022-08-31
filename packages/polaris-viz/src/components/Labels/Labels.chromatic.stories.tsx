import React from 'react';
import {storiesOf} from '@storybook/react';

import {XAxis} from '../XAxis';
import {ChartContext} from '@shopify/polaris-viz-core';

import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';

const LABELS = [
  'Jan 12, 2020',
  'Feb 12, 2020',
  'March 12, 2020',
  'Apr 12, 2020',
  'May 12, 2020',
];

const CHART_HEIGHT = 100;

const stories = storiesOf(
  `Chromatic/Components/Labels/XAxis`,
  module,
).addParameters({
  chromatic: {disableSnapshot: false},
});

[true, false].forEach((allowLineWrap) => {
  stories.add(`allowLineWrap: ${allowLineWrap}`, () => {
    return (
      <>
        {[75, 200, 300, 400].map((chartWidth) => {
          const labelWidth = chartWidth / LABELS.length;
          const storyName = `Chart width: ${chartWidth}px`;

          return (
            <Wrapper storyName={storyName} chartWidth={chartWidth}>
              <XAxis
                allowLineWrap={allowLineWrap}
                ariaHidden={false}
                labels={LABELS}
                labelWidth={labelWidth}
                onHeightChange={() => {}}
                x={0}
                xScale={((index) => index * labelWidth) as any}
                y={0}
              />
            </Wrapper>
          );
        })}
      </>
    );
  });
});

stories.add(`reducedLabelIndexes`, () => {
  return (
    <>
      {[[], [0, 2, 4], [0]].map((reducedLabelIndexes) => {
        const chartWidth = 400;
        const labelWidth = chartWidth / LABELS.length;
        const storyName = `Chart width: ${chartWidth}px`;

        return (
          <Wrapper storyName={storyName} chartWidth={chartWidth}>
            <XAxis
              allowLineWrap={true}
              ariaHidden={false}
              labels={LABELS}
              labelWidth={labelWidth}
              onHeightChange={() => {}}
              reducedLabelIndexes={reducedLabelIndexes}
              x={0}
              xScale={((index) => index * labelWidth) as any}
              y={0}
            />
          </Wrapper>
        );
      })}
    </>
  );
});

function Wrapper({storyName, chartWidth, children}) {
  return (
    <>
      <p>
        <strong>{storyName}</strong>
      </p>
      <svg
        style={{
          height: CHART_HEIGHT,
          width: chartWidth,
          overflow: 'visible',
          marginLeft: 20,
        }}
      >
        <ChartContext.Provider
          value={{
            shouldAnimate: false,
            characterWidths,
            characterWidthOffsets,
            id: '',
            isPerformanceImpacted: false,
            theme: 'Default',
          }}
        >
          {children}
        </ChartContext.Provider>
      </svg>
    </>
  );
}
