import {a, useTransition, config} from '@react-spring/web';
import React, {useState} from 'react';

import {Sparkbar} from '../../components';

import CodeMajor from './images/CodeMajor.svg';
import SaveMinor from './images/SaveMinor.svg';
import styles from './Widget.scss';

export function Widget() {
  const [frontVisible, setFrontVisible] = useState(true);
  const transitions = useTransition(frontVisible, {
    from: {
      position: 'absolute',
      opacity: 1,
      transform: [180, 0],
    },
    enter: {opacity: 1, transform: [180, 0]},
    leave: {opacity: 0, transform: [0, 180]},
    // update: {opacity: 0, transform: [0, 180]},
    // delay: 200,
    config: config.molasses,
  });

  function Front() {
    return (
      <div
        style={{
          width: '250px',
          willChange: 'transform opacity',
          height: '200px',
        }}
      >
        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => setFrontVisible((state) => !state)}
          >
            <img width={18} height={18} src={CodeMajor} alt="edit" />
          </button>
        </div>

        <div className={styles.TextContainer}>
          <p>Total sales</p>
          <p className={styles.Number}>$1,234.50</p>
        </div>

        <div style={{width: 250, height: 100}}>
          <Sparkbar
            data={[100, 200, 300, 400, 400, 1000, 200, 800, 900, 200, 400]}
            comparison={[
              {x: 0, y: 500},
              {x: 1, y: 500},
              {x: 2, y: 500},
              {x: 3, y: 500},
              {x: 4, y: 500},
              {x: 5, y: 500},
              {x: 6, y: 500},
              {x: 7, y: 500},
              {x: 8, y: 500},
              {x: 9, y: 500},
              {x: 10, y: 500},
            ]}
            barFillStyle="gradient"
          />
        </div>
      </div>
    );
  }

  function Back() {
    return (
      <div
        style={{
          willChange: 'transform opacity',
          height: '200px',
          width: '250px',
        }}
      >
        <textarea
          className={styles.TextArea}
          value="SHOW total_sales FROM SALES SINCE -2w UNTIL today"
        />

        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => setFrontVisible((state) => !state)}
          >
            <img width={18} height={18} src={SaveMinor} alt="save" />
          </button>
        </div>
      </div>
    );
  }

  return transitions(({opacity, transform}, frontState) =>
    frontState ? (
      <a.div
        style={{
          position: 'absolute',
          opacity: opacity.to({range: [0.0, 1.0], output: [0, 1]}),
          background: 'red',
          transform: transform.to((x, y) => `rotateX(${y}deg)`),
        }}
      >
        <Front />
      </a.div>
    ) : (
      <a.div
        style={{
          position: 'absolute',
          opacity: opacity.to({range: [1.0, 0.0], output: [1, 0]}),
          background: 'purple',
          transform: transform.to((x, y) => `rotateX(${y}deg)`),
        }}
      >
        <Back />
      </a.div>
    ),
  );
}
