import { readonly } from './util';

export default class Point {
  constructor(x = 0, y = x) {
    readonly(this, 'x', x);
    readonly(this, 'y', y);
  }

  scaleBy(factorX, factorY = factorX) {
    return new Point(this.x * factorX, this.y * factorY);
  }
}
