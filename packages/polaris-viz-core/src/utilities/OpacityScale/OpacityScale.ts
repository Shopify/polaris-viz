import {scaleQuantize} from 'd3-scale';

import type {Hue} from '../../types';
import variables from '../../styles/shared/_variables.scss';

import {HUE_OPACITIES} from './constants';

const HUE_COUNT = 10;

interface Props {
  hue: Hue;
  min?: number;
  max?: number;
}

export function OpacityScale({hue, min = 0, max = HUE_COUNT}: Props) {
  const scale = scaleQuantize<string>()
    .range(HUE_OPACITIES[hue])
    .domain([min, max]);

  return (value: number) => {
    return {
      backgroundColor: scale(value),
      textColor: variables.colorGray160,
    };
  };
}
