import { readonly } from './util';

export default class Size {
  constructor(width = 0, height = width) {
    readonly(this, 'width', width);
    readonly(this, 'height', height);
  }
}
