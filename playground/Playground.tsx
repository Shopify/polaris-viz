import React, {useState} from 'react';

import * as PlaygroundDemos from '../documentation/code';

export default function Playground() {
  const [showDemos, setShowDemos] = useState(false);
  const toggleDemos = () => setShowDemos((showingDemos) => !showingDemos);

  return <PlaygroundDemos.LineChartDemo />;
}
