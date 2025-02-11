import {scaleQuantize} from 'd3-scale';

import type {Hue} from '../../types';
import {HUES} from '../../constants';
import variables from '../../styles/shared/_variables.scss';

const DARK_TEXT_MIN = 8;
const HUE_COUNT = 17;

interface Props {
  hue: Hue;
  min?: number;
  max?: number;
}

export function ColorScale({hue, min = 0, max = HUE_COUNT}: Props) {
  const scale = scaleQuantize<string>().range(HUES[hue]).domain([min, max]);

  return (value: number) => {
    const color = scale(value);
    const colorIndex = HUES[hue].indexOf(color);

    return {
      backgroundColor: scale(value),
      textColor:
        colorIndex < DARK_TEXT_MIN
          ? variables.colorGray150
          : variables.colorWhite,
    };
  };
}
