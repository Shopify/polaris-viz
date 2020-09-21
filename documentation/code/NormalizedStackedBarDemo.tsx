import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {NormalizedStackedBar} from '../../src/components';

// eslint-disable-next-line import/no-default-export
export default function NormalizedStackedBarDemo() {
  const outerContainerStyle = {
    background: 'white',
    padding: '3rem',
  };

  const innerContainerStyle = {
    width: '900px',
    height: '200px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <NormalizedStackedBar
          data={[
            {
              label: 'Direct',
              value: 200,
              formattedValue: '$200',
            },
            {
              label: 'Facebook',
              value: 100,
              formattedValue: '$100',
            },
            {
              label: 'Twitter',
              value: 100,
              formattedValue: '$100',
            },
            {
              label: 'Google',
              value: 20,
              formattedValue: '$20',
            },
          ]}
          accessibilityLabel="A chart showing the breakdown of ad revenue"
          colors={['primary', 'secondary', 'tertiary', 'quaternary']}
          orientation="horizontal"
          size="large"
        />
      </div>
    </div>
  );
}
