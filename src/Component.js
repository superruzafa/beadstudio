import Size from './Size';

export default class Component {
  constructor(options = {}) {
    this._element = options.element;
    this._position = options.position;
    this._size = options.size;
    this._isStaged = options.isStaged;

    this._parent = null;
    this._children = [];
  }

  element() {
    return this._element;
  }

  position(point) {
    if (!point) {
      return this._position;
    }
    this._position = point;
    this._onPositionChanged(point);
    return this;
  }

  _onPositionChanged(point) {
    const { x, y } = point;
    this._element.style.left = `${x}px`;
    this._element.style.top = `${y}px`;
  }

  size(size) {
    if (!size) {
      return this._size;
    }
    this._size = size;
    this._onSizeChanged(size);
    return this;
  }

  width(width) {
    return width
      ? this.size(new Size(width, this._size ? this._size.height : 0))
      : this._size ? this._size.width : undefined;
  }

  height(height) {
    return height
      ? this.size(new Size(this._size ? this._size.width : 0, height))
      : this._size ? this._size.height : undefined;
  }

  _onSizeChanged(size) {
    const { width, height } = size;
    this._element.style.width = `${width}px`;
    this._element.style.height = `${height}px`;
  }

  add(component) {
    component.parent = this;
    this._children.push(component);
    this._onComponentAdded(component);
    if (this._isStaged) {
      component._onStaged();
    }
    return this;
  }

  _onComponentAdded(component) {
    this._element.appendChild(component._element);
  }

  _onStaged() {}
}
