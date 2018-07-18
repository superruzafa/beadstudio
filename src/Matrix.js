import { readonly } from './util';

function unpack(...rows) {
  const cols = rows.reduce((prev, curr) =>
    Math.max(prev, curr.length), 0
  );
  const padding = Array(cols - 1).fill(0);
  const elems = rows
    .map(row => row
      .concat(padding)
      .slice(0, cols)
    )
    .reduce((prev, curr) => prev.concat(curr), []);

  return {
    rows: rows.length,
    cols,
    elems
  };
}

function pack(elems, cols) {
  const rows = [];
  for (let i = 0; i < elems.length; i += cols) {
    rows.push(elems.slice(i, i + cols));
  }
  return rows;
}

export default class Matrix {
  constructor(...rows) {
    const { rows: numrows, cols, elems } = unpack(...rows);
    readonly(this, 'rows', numrows);
    readonly(this, 'cols', cols);
    readonly(this, 'elems', elems);
  }

  static identity(size) {
    const zeros = Array(size).fill(0);
    const rows = [];
    for (let i = 0; i < size; i++) {
      const row = zeros.slice();
      row[i] = 1;
      rows.push(row);
    }
    return new Matrix(...rows);
  }

  product(that) {
    if (this.cols != that.rows) {
      throw `Matrix product (${this.rows}×${this.cols} x ${that.rows}×${that.cols})`;
    }
    const rows = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < that.cols; c++) {
        let v = 0;
        let o1 = r * this.cols;
        let o2 = c;
        for (let i = 0; i < this.cols; i++) {
          v += this.elems[o1] * that.elems[o2];
          o1++;
          o2 += that.cols;
        }
        row.push(v);
      }
      rows.push(row);
    }
    return new Matrix(...rows);
  }

  toString() {
    return pack(this.elems, this.cols)
      .map(row => row.join(', '))
      .join('\n');
  }
}
