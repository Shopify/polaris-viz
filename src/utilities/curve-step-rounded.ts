import {Path} from 'd3-path';
import {CurveGenerator} from 'd3-shape';

const DEFAULT_DISTANCE = 0.99;
const DEFAULT_ROUNDNESS = 0.59;
export interface CurveStepRoundedProps {
  distance: number;
  roundness: number;
}

// This is a modified version of https://github.com/d3/d3-shape/blob/master/src/curve/step.js
// to allow rounding the vertices of d3.curveStep
export class CurveStepRounded implements CurveGenerator {
  private config: CurveStepRoundedProps;

  private _context: CanvasRenderingContext2D | Path;
  private _shift: number;
  private _line!: number;
  private _x!: number;
  private _y!: number;
  private _point!: number;

  constructor(
    _context: CanvasRenderingContext2D | Path,
    config: CurveStepRoundedProps,
  ) {
    this._context = _context;
    this.config = config;
    this._shift = 0.5;
  }

  areaStart() {
    this._line = 0;
  }

  areaEnd() {
    this._line = NaN;
  }

  lineStart() {
    this._x = NaN;
    this._y = NaN;
    this._point = 0;
  }

  lineEnd() {
    if (this._shift > 0 && this._shift < 1 && this._point === 2) {
      this._context.lineTo(this._x, this._y);
    }
    if (this._line || (this._line !== 0 && this._point === 1)) {
      this._context.closePath();
    }
    if (this._line >= 0) {
      this._shift = 1 - this._shift;
      this._line = 1 - this._line;
    }
  }

  point(rawX?: number, rawY?: number) {
    const x = Number(rawX);
    const y = Number(rawY);

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      default: {
        if (this._point === 1) {
          this._point = 2;
        }
        if (this._shift <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          const x1 = this._x * (1 - this._shift) + x * this._shift;

          const pointOffset = (x - this._x) * (this.config.distance / 2);
          const roundness = this.config.roundness;

          const points = [
            [x1 - pointOffset, this._y],
            [x1 + pointOffset, y],
          ];

          const xDistance = points[1][0] - points[0][0];

          const controlPoints = [
            [points[0][0] + xDistance * roundness, points[0][1]],
            [points[1][0] - xDistance * roundness, points[1][1]],
          ];

          this._context.lineTo(points[0][0], points[0][1]);
          this._context.bezierCurveTo(
            controlPoints[0][0],
            controlPoints[0][1],
            controlPoints[1][0],
            controlPoints[1][1],
            points[1][0],
            points[1][1],
          );
        }
        break;
      }
    }
    this._x = x;
    this._y = y;
  }
}

export function curveStepRounded(context: CanvasRenderingContext2D | Path) {
  return new CurveStepRounded(context, {
    distance: DEFAULT_DISTANCE,
    roundness: DEFAULT_ROUNDNESS,
  });
}
