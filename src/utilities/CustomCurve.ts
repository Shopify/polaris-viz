/* eslint-disable no-fallthrough */
// eslint-disable-next-line import/no-extraneous-dependencies
import {Path} from 'd3-path';

interface Config {
  distance?: number;
  shift?: number;
  tilt?: number;
}

export class CustomCurve {
  public context: CanvasRenderingContext2D | Path;
  public config: Config;

  private _t?: number;
  private _line?: number;
  private _x?: number;
  private _y?: number;
  private _point?: number;

  constructor(context: CanvasRenderingContext2D | Path, config?: Config) {
    this.context = context;
    this.config = {
      distance: 1,
      shift: 0.5,
      tilt: 0.3,
      ...config,
    };

    this._t = this.config.shift;
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
    const {_t = 0, _x = 0, _y = 0, _line = 0} = this;
    if (_t > 0 && _t < 1 && this._point === 2) {
      this.context.lineTo(_x, _y);
    }
    if (this._line || (this._line !== 0 && this._point === 1)) {
      this.context.closePath();
    }
    if (_line >= 0) {
      this._t = 1 - _t;
      this._line = 1 - _line;
    }
  }

  point(x: number, y: number) {
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this.context.lineTo(x, y) : this.context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
      default: {
        const {_t = 0, _x = 0} = this;
        const {config} = this;
        const {distance} = config;
        const distanceToUse = distance == null ? 0 : distance;

        if (_t <= 0) {
          this.context.lineTo(_x, y);
          this.context.lineTo(x, y);
        } else {
          const x1 = _x * (1 - _t) + x * _t;

          const pointOffset = (x - _x) * (distanceToUse / 2);
          const {tilt = 0} = this.config;
          const {_y = 0} = this;

          const point1 = [x1 - pointOffset, _y];
          const point2 = [x1 + pointOffset, y];
          const xDistance = point2[0] - point1[0];
          const controlPoint1 = [point1[0] + xDistance * tilt, point1[1]];
          const controlPoint2 = [point2[0] - xDistance * tilt, point2[1]];

          this.context.lineTo(point1[0], point1[1]);

          this.context.bezierCurveTo(
            controlPoint1[0],
            controlPoint1[1],
            controlPoint2[0],
            controlPoint2[1],
            point2[0],
            point2[1],
          );
        }
        break;
      }
    }
    this._x = x;
    this._y = y;
  }
}
