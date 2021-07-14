import {useSpring, a} from '@react-spring/web';
import React, {useState} from 'react';

import {Sparkbar} from '../../components';

import CodeMajor from './images/CodeMajor.svg';
import SaveMinor from './images/SaveMinor.svg';
import styles from './Widget.scss';

const windowWidth = window.innerWidth;
const constrainedWidth = Math.min(windowWidth, 500);

export function Widget() {
  const [flipped, set] = useState(true);
  const [textVal, setTextVal] = useState(
    'SHOW total_sales \nFROM SALES\nSINCE -2w\nUNTIL today',
  );

  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  });

  return (
    <div
      style={{
        willChange: 'transform opacity',
        position: 'absolute',
        height: '200px',
        width: '100%',
      }}
    >
      <a.div
        className={styles.Card}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => set((state) => !state)}
          >
            <img width={18} height={18} src={CodeMajor} alt="edit" />
          </button>
        </div>

        <div className={styles.TextContainer}>
          <p>Total sales</p>
          <p className={styles.Number}>$1,234.50</p>
        </div>

        <div style={{width: constrainedWidth, height: 100}}>
          <Sparkbar
            isAnimated
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
      </a.div>

      <a.div
        className={styles.Card}
        style={{
          opacity: opacity.to((opacity) => 1 - opacity),
          transform,
          width: `${constrainedWidth}px`,
        }}
      >
        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => set((state) => !state)}
          >
            <img width={18} height={18} src={SaveMinor} alt="save" />
          </button>
        </div>
        <textarea
          className={styles.TextArea}
          onChange={(val) => {
            setTextVal(val.target.value);
          }}
        >
          {textVal}
        </textarea>
      </a.div>
    </div>
  );
}
