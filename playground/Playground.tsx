import React, {useState} from 'react';

import '@shopify/polyfills/base';

import * as PlaygroundDemos from '../documentation/code';

const Demos = () => {
  return (
    <>
      {Object.entries(PlaygroundDemos).map(([title, Component]) => {
        return (
          <span key={title}>
            <h3>{title}</h3>
            <div
              style={{
                height: title == 'BarChartDemo' ? '300px' : '100%',
              }}
            >
              <Component />
            </div>
          </span>
        );
      })}
    </>
  );
};

export default function Playground() {
  const [showDemos, setShowDemos] = useState(false);
  const toggleDemos = () => setShowDemos((showingDemos) => !showingDemos);

  return (
    <div>
      <h3>Playground area</h3>

      <PlaygroundDemos.SparkbarDemo />
      <br />
      <button onClick={toggleDemos}>Toggle Demos</button>
      {showDemos && <Demos />}
    </div>
  );
}
