import Pegboard from './Pegboard';
import Point from './Point';

export default class SquarePegboard extends Pegboard {
  constructor(length = 15, options = {}) {
    super(options);
    this._pegboard.length = length;
  }

  _pegs() {
    const { length } = this._pegboard;
    const p0 = -Math.floor(length / 2);
    const pegs = [];
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        pegs.push(new Point(p0 + x, p0 + y));
      }
    }
    return pegs;
  }

  _drawBase() {
    const ctx = this._context;
    const { length, padding, spacing } = this._pegboard;
    const len = (length * spacing + padding);
    const p0 = -len / 2;

    ctx.beginPath();
    ctx.rect(p0, p0, len, len);
    ctx.fill();
    ctx.stroke();
  }

  pegboard2canvas(peg) {
    const { spacing } = this._pegboard;
    return peg.scaleBy(spacing);
  }

}
