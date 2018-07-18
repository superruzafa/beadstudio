import Matrix from './Matrix';
import { readonly } from './util';

function translationMatrix(tx, ty) {
  return new Matrix(
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  );
}

function scalingMatrix(sx, sy) {
  return new Matrix(
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1]
  );
}

export default class Transform {
  constructor(matrix = Matrix.identity(3), values = {}) {
    readonly(this, 'matrix', matrix);
    readonly(this, 'tx', values.tx || 0);
    readonly(this, 'ty', values.ty || 0);
    readonly(this, 'angle', values.angle || 0);
    readonly(this, 'sx', values.sx || 1);
    readonly(this, 'sy', values.sy || 1);
  }

  transform(that) {
    return new Transform(
      this.matrix.product(that.matrix), {
        tx: this.tx + that.tx,
        ty: this.ty + that.ty,
        angle: this.angle + that.angle,
        sx: this.sx * that.sx,
        sy: this.sy * that.sy
      }
    );
  }

  translate(tx, ty = tx) {
    const matrix = this.matrix.product(translationMatrix(tx, ty));
    return new Transform(matrix, {
      tx: this.tx + tx,
      ty: this.ty + ty,
      angle: this.angle,
      sx: this.sx,
      sy: this.sy
    });
  }

  scale(sx, sy = sx) {
    const matrix = this.matrix.product(scalingMatrix(sx, sy));
    return new Transform(matrix, {
      tx: this.tx,
      ty: this.ty,
      angle: this.angle,
      sx: this.sx * sx,
      sy: this.sy * sy
    });
  }

  toString() {
    return this.matrix.toString();
  }
}
