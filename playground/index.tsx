import * as React from 'react';
import ReactDOM from 'react-dom';
import {NormalizedStackedBar, Sparkline, BarChart} from '../src/components';

export default function Playground() {
  const data = [
    {rawValue: 3.19, label: 'Chicago Hot Dog'},
    {rawValue: 6.29, label: 'Italian Beef'},
    {rawValue: 4.79, label: 'Polish Sausage'},
    {
      rawValue: 0.6,
      label: 'Hot Peppers',
    },
    {rawValue: 2.69, label: 'French Fries'},
    {rawValue: 4.19, label: 'Cake Shake'},
  ];

  const formatYValue = (val) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumSignificantDigits: 3,
    }).format(val);

  return (
    <>
      <div style={{width: '1000px', height: '500px'}}>
        <BarChart formatYValue={formatYValue} color="primary" data={data} />
      </div>
      <div style={{height: '501px', margin: '40px'}}>
        <NormalizedStackedBar
          data={[
            {
              label: 'Google',
              value: 0,
              formattedValue: '$0',
            },
            {
              label: 'Direct',
              value: 500,
              formattedValue: '$500',
            },
            {label: 'Facebook', value: 100, formattedValue: '$100'},
            {label: 'Twitter', value: 100, formattedValue: '$100'},
          ]}
        />
      </div>
    </>
  );
}

ReactDOM.render(<Playground />, document.getElementById('root'));
