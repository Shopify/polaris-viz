import React from 'react';
import {pie} from 'd3-shape';
import {useSprings, config} from 'react-spring';

import {getColorValue, getDefaultColor, uniqueId} from '../../utilities';

import {Arc, Legend} from './components';
import styles from './PieChart.scss';

export interface DataProps {
  label: string;
  value: number;
  formattedValue: string;
}

interface Props {
  data: DataProps[];
  outerRadius: number;
  innerRadius?: number;
  animation?: boolean;
}

export function PieChart({
  data,
  outerRadius,
  innerRadius = outerRadius / 2,
  animation = true,
}: Props) {
  const generatedSlices = pie()(data.map((data: DataProps) => data.value));

  const initialSlices = generatedSlices.map((slice) => ({
    ...slice,
    endAngle: slice.startAngle + 0.1,
  }));

  const [springs, set] = useSprings(generatedSlices.length, (index) => ({
    endAngle: generatedSlices[index].startAngle,
  }));

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  set((index: number) => ({
    endAngle: generatedSlices[index].endAngle,
    config: config.slow,
  }));

  const seriesForLegend = data.map((data, index) => {
    return {
      name: data.label,
      color: getDefaultColor(index),
      value: data.value,
    };
  });

  return (
    <div className={styles.Container}>
      <svg
        width={outerRadius * 2}
        height={outerRadius * 2}
        viewBox={`-${outerRadius} -${outerRadius} ${outerRadius *
          2} ${outerRadius * 2}`}
        role="list"
      >
        {animation
          ? springs.map((spring, index) => {
              return (
                <Arc
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  slice={initialSlices[index]}
                  spring={animation ? spring : undefined}
                  color={getColorValue(seriesForLegend[index].color)}
                  formattedValue={data[index].formattedValue}
                  label={data[index].label}
                  key={uniqueId(data[index].value.toString())}
                />
              );
            })
          : generatedSlices.map((slice, index) => {
              return (
                <Arc
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  slice={slice}
                  color={getColorValue(seriesForLegend[index].color)}
                  formattedValue={data[index].formattedValue}
                  label={data[index].label}
                  key={uniqueId(data[index].value.toString())}
                />
              );
            })}
      </svg>
      <Legend series={seriesForLegend} />
    </div>
  );
}
