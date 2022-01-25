interface Dimensions {
  sideA: number;
  sideB: number;
  sideC: number;
}

type AtLeastOneValue<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
  U[keyof U];

export class RightAngleTriangle {
  public dimensions: AtLeastOneValue<Dimensions>;

  constructor(dimensions: AtLeastOneValue<Dimensions>) {
    this.dimensions = dimensions;
  }

  getAdjacentLength() {
    const {sideA, sideB, sideC} = this.dimensions;
    if (sideA != null) {
      return sideA;
    } else if (sideB != null && sideC != null) {
      return Math.sqrt(sideC ** 2 - sideB ** 2);
    } else {
      throw new Error(
        'Must provide side A or side B and C to find adjacent length',
      );
    }
  }

  getOppositeLength() {
    const {sideA, sideB, sideC} = this.dimensions;
    if (sideB != null) {
      return sideB;
    } else if (sideA != null && sideC != null) {
      return Math.sqrt(sideC ** 2 - sideA ** 2);
    } else
      throw new Error(
        'Must provide side B or side C and A to find opposite length',
      );
  }

  getHypotenuseLength() {
    const {sideA, sideB, sideC} = this.dimensions;
    if (sideC != null) {
      return sideC;
    } else if (sideA != null && sideB != null) {
      return Math.hypot(sideA, sideB);
    } else
      throw new Error(
        'Must provide side C or side B and A to find hypotenuse length',
      );
  }
}
