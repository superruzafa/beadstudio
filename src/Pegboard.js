import Canvas from './Canvas';

export default class Pegboard extends Canvas {
  constructor(options = {}) {
    super(options);
    this._pegboard = {
      spacing: options.spacing || 10,
      padding: options.padding || 10,
      pegsize: options.pegsize || 4
    };
  }

  _draw() {
    const ctx = this._context;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    this._drawBase();
    this._pegs().forEach(peg => this._drawPeg(peg));
  }

  _drawBase() {}

  _drawPeg(peg) {
    const { x, y } = this.pegboard2canvas(peg);
    const { pegsize } = this._pegboard;
    const ctx = this._context;
    ctx.beginPath();
    ctx.arc(x, y, pegsize / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  pegboard2canvas() {}
}
