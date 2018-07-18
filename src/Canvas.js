import Component from './Component';
import Transform from './Transform';

function pixelRatio(context) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
  return devicePixelRatio / backingStoreRatio;
}

export default class Canvas extends Component {
  constructor(options = {}) {
    super(Canvas._initOptions(options));
    this._context = this._element.getContext('2d');
    this._pixelRatio = pixelRatio(this._context);
  }

  static _initOptions(options = {}) {
    return Object.assign({}, options, {
      element: document.createElement('canvas')
    });
  }

  _onSizeChanged(size) {
    super._onSizeChanged(size);
    const { width, height } = size;
    this._element.width = width * this._pixelRatio;
    this._element.height = height * this._pixelRatio;
  }

  _onStaged() {
    this._draw();
  }

  transform(transform) {
    this._context.resetTransform();
    const [sx, kx, tx, ky, sy, ty] = new Transform()
      .scale(this._pixelRatio)
      .transform(transform)
      .matrix.elems;
    this._context.setTransform(sx, ky, kx, sy, tx, ty);
    this._draw();
  }

  _draw() {}
}
