import {a, useTransition} from '@react-spring/web';
import React, {useState, useEffect} from 'react';

import {usePrevious} from '../../hooks';
import {Sparkbar, Sparkline} from '../../components';

import CodeMajor from './images/CodeMajor.svg';
import SaveMinor from './images/SaveMinor.svg';
import styles from './Widget.scss';

function Back({toggle, width}: {width: number; toggle: () => void}) {
  const [textVal, setTextVal] = useState(
    'SHOW total_sales \nFROM SALES\nSINCE -2w\nUNTIL today',
  );
  return (
    <div
      style={{
        willChange: 'transform opacity',
      }}
    >
      <div className={styles.ButtonContainer}>
        <button className={styles.Button} onClick={toggle}>
          <img width={18} height={18} src={SaveMinor} alt="save" />
        </button>
      </div>
      <textarea
        style={{width, height: width < 300 ? '100px' : '180px'}}
        value={textVal}
        className={styles.TextArea}
        onBlur={() => null}
        onChange={(val) => {
          setTextVal(val.target.value);
        }}
      />
    </div>
  );
}

function Front({
  toggle,
  type,
  width,
}: {
  width: number;
  toggle: () => void;
  type: Chart;
}) {
  const vizContent =
    type === 'sparkbar' ? (
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
    ) : (
      <Sparkline
        hasSpline
        isAnimated
        series={[
          {
            color: 'colorTeal',
            areaStyle: 'gradient',
            data: [
              {x: 0, y: 100},
              {x: 1, y: 200},
              {x: 2, y: 300},
              {x: 3, y: 400},
              {x: 4, y: 400},
              {x: 5, y: 1000},
              {x: 6, y: 200},
              {x: 7, y: 800},
              {x: 8, y: 900},
              {x: 9, y: 200},
              {x: 10, y: 400},
            ],
          },
          {
            color: 'pastComparison',
            areaStyle: 'none',
            lineStyle: 'dashed',
            data: [
              {x: 0, y: 10},
              {x: 1, y: 20},
              {x: 2, y: 30},
              {x: 3, y: 40},
              {x: 4, y: 40},
              {x: 5, y: 400},
              {x: 6, y: 20},
              {x: 7, y: 80},
              {x: 8, y: 90},
              {x: 9, y: 20},
              {x: 10, y: 40},
            ],
          },
        ]}
      />
    );

  return (
    <div
      style={{
        willChange: 'transform opacity',
      }}
    >
      <div className={styles.ButtonContainer}>
        <button className={styles.Button} onClick={() => toggle()}>
          <img width={18} height={18} src={CodeMajor} alt="edit" />
        </button>
      </div>

      <div className={styles.TextContainer}>
        <p>Total sales</p>
        <p className={styles.Number}>$1,234.50</p>
      </div>

      {width < 300 ? null : (
        <div style={{width, height: 100}}>{vizContent}</div>
      )}
    </div>
  );
}

type Chart = 'sparkline' | 'sparkbar';

export function Widget({type = 'sparkline'}: {type: Chart}) {
  const [frontVisible, setFrontVisible] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const prevInitialRender = usePrevious(initialRender);
  const transitions = useTransition(frontVisible, {
    from: {opacity: 0},
    enter: {opacity: 1},
    reverse: frontVisible,
  });
  const [width, setWidth] = useState(window.innerWidth - 50);

  useEffect(() => {
    setInitialRender(false);
    // remove listener
    window.addEventListener('resize', () => setWidth(window.innerWidth - 50));
  }, []);

  const animatedContent = transitions(({opacity}, frontState) =>
    frontState ? (
      <a.div
        className={styles.Card}
        style={{
          width,
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
        <Front
          width={width}
          type={type}
          toggle={() => setFrontVisible((state) => !state)}
        />
      </a.div>
    ) : (
      <a.div
        className={styles.Card}
        style={{
          opacity: opacity.to({range: [1.0, 0.0], output: [1, 0]}),
          transform: opacity.to({
            range: [1.0, 0.0],
            output: [`rotateX(0deg)`, `rotateX(180deg)`],
          }),
        }}
      >
        <Back width={width} toggle={() => setFrontVisible((state) => !state)} />
      </a.div>
    ),
  );

  return <div>{animatedContent}</div>;
}
