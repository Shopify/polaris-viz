import {changeColorOpacity} from '../../utilities/changeColorOpacity';
import {Hue} from '../../types';
import variables from '../../styles/shared/_variables.scss';

function buildOpacityScale(color: string) {
  return [...new Array(10)].fill(null).map((_, i) => {
    const index = i + 1;
    return changeColorOpacity(color, index / 10);
  });
}

export const HUE_OPACITIES: {[key in Hue]: string[]} = {
  [Hue.Teal]: buildOpacityScale(variables.colorTeal70),
  [Hue.Blue]: buildOpacityScale(variables.colorBlue70),
  [Hue.Indigo]: buildOpacityScale(variables.colorIndigo70),
  [Hue.Purple]: buildOpacityScale(variables.colorPurple70),
  [Hue.Magenta]: buildOpacityScale(variables.colorMagenta70),
  [Hue.Orange]: buildOpacityScale(variables.colorOrange70),
  [Hue.Yellow]: buildOpacityScale(variables.colorYellow70),
};
