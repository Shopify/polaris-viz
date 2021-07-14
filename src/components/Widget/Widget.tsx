import {a, useTransition, config} from '@react-spring/web';
import React, {useState, useEffect} from 'react';

import {usePrevious} from '../../hooks';
import {Sparkbar} from '../../components';

import CodeMajor from './images/CodeMajor.svg';
import SaveMinor from './images/SaveMinor.svg';
import styles from './Widget.scss';

export function Widget() {
  const [frontVisible, setFrontVisible] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const prevInitialRender = usePrevious(initialRender);
  const transitions = useTransition(frontVisible, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    reverse: frontVisible,
  });
  const [textVal, setTextVal] = useState(
    'SHOW total_sales \nFROM SALES\nSINCE -2w\nUNTIL today',
  );

  useEffect(() => {
    setInitialRender(false);
  }, []);

  function Front() {
    return (
      <div
        style={{
          willChange: 'transform opacity',
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
        }}
      >
        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => setFrontVisible((state) => !state)}
          >
            <img width={18} height={18} src={SaveMinor} alt="save" />
          </button>
        </div>
        <textarea
          value={textVal}
          className={styles.TextArea}
          onChange={(val) => {
            setTextVal(val.target.value);
          }}
        />
      </div>
    );
  }

  return transitions(({opacity}, frontState) =>
    frontState ? (
      <a.div
        className={styles.Card}
        style={{
          position: 'absolute',
          opacity: prevInitialRender
            ? 1
            : opacity.to({range: [0.0, 1.0], output: [0, 1]}),
          transform: prevInitialRender
            ? ''
            : opacity.to({
                range: [0.0, 1.0],
                output: [`rotateX(180deg)`, `rotateX(0deg)`],
              }),
        }}
      >
        <Front />
      </a.div>
    ) : (
      <a.div
        style={{
          position: 'absolute',
          opacity: opacity.to({range: [1.0, 0.0], output: [1, 0]}),
          transform: opacity.to({
            range: [1.0, 0.0],
            output: [`rotateX(0deg)`, `rotateX(180deg)`],
          }),
        }}
      >
        <Back />
      </a.div>
    ),
  );
}
