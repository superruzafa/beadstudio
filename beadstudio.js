var beadstudio = (function () {
  'use strict';

  function readonly(object, name, value) {
    Object.defineProperty(object, name, {
      enumerable: true,
      configurable: false,
      writable: false,
      value: value
    });
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var Size = function Size() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    classCallCheck(this, Size);

    readonly(this, 'width', width);
    readonly(this, 'height', height);
  };

  var Component = function () {
    function Component() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Component);

      this._element = options.element;
      this._position = options.position;
      this._size = options.size;
      this._isStaged = options.isStaged;

      this._parent = null;
      this._children = [];
    }

    createClass(Component, [{
      key: 'element',
      value: function element() {
        return this._element;
      }
    }, {
      key: 'position',
      value: function position(point) {
        if (!point) {
          return this._position;
        }
        this._position = point;
        this._onPositionChanged(point);
        return this;
      }
    }, {
      key: '_onPositionChanged',
      value: function _onPositionChanged(point) {
        var x = point.x,
            y = point.y;

        this._element.style.left = x + 'px';
        this._element.style.top = y + 'px';
      }
    }, {
      key: 'size',
      value: function size(_size) {
        if (!_size) {
          return this._size;
        }
        this._size = _size;
        this._onSizeChanged(_size);
        return this;
      }
    }, {
      key: 'width',
      value: function width(_width) {
        return _width ? this.size(new Size(_width, this._size ? this._size.height : 0)) : this._size ? this._size.width : undefined;
      }
    }, {
      key: 'height',
      value: function height(_height) {
        return _height ? this.size(new Size(this._size ? this._size.width : 0, _height)) : this._size ? this._size.height : undefined;
      }
    }, {
      key: '_onSizeChanged',
      value: function _onSizeChanged(size) {
        var width = size.width,
            height = size.height;

        this._element.style.width = width + 'px';
        this._element.style.height = height + 'px';
      }
    }, {
      key: 'add',
      value: function add(component) {
        component.parent = this;
        this._children.push(component);
        this._onComponentAdded(component);
        if (this._isStaged) {
          component._onStaged();
        }
        return this;
      }
    }, {
      key: '_onComponentAdded',
      value: function _onComponentAdded(component) {
        this._element.appendChild(component._element);
      }
    }, {
      key: '_onStaged',
      value: function _onStaged() {}
    }]);
    return Component;
  }();

  var Point = function () {
    function Point() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      classCallCheck(this, Point);

      readonly(this, 'x', x);
      readonly(this, 'y', y);
    }

    createClass(Point, [{
      key: 'scaleBy',
      value: function scaleBy(factorX) {
        var factorY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : factorX;

        return new Point(this.x * factorX, this.y * factorY);
      }
    }]);
    return Point;
  }();

  function unpack() {
    for (var _len = arguments.length, rows = Array(_len), _key = 0; _key < _len; _key++) {
      rows[_key] = arguments[_key];
    }

    var cols = rows.reduce(function (prev, curr) {
      return Math.max(prev, curr.length);
    }, 0);
    var padding = Array(cols - 1).fill(0);
    var elems = rows.map(function (row) {
      return row.concat(padding).slice(0, cols);
    }).reduce(function (prev, curr) {
      return prev.concat(curr);
    }, []);

    return {
      rows: rows.length,
      cols: cols,
      elems: elems
    };
  }

  function pack(elems, cols) {
    var rows = [];
    for (var i = 0; i < elems.length; i += cols) {
      rows.push(elems.slice(i, i + cols));
    }
    return rows;
  }

  var Matrix = function () {
    function Matrix() {
      classCallCheck(this, Matrix);

      var _unpack = unpack.apply(undefined, arguments),
          numrows = _unpack.rows,
          cols = _unpack.cols,
          elems = _unpack.elems;

      readonly(this, 'rows', numrows);
      readonly(this, 'cols', cols);
      readonly(this, 'elems', elems);
    }

    createClass(Matrix, [{
      key: 'product',
      value: function product(that) {
        if (this.cols != that.rows) {
          throw 'Matrix product (' + this.rows + '\xD7' + this.cols + ' x ' + that.rows + '\xD7' + that.cols + ')';
        }
        var rows = [];
        for (var r = 0; r < this.rows; r++) {
          var row = [];
          for (var c = 0; c < that.cols; c++) {
            var v = 0;
            var o1 = r * this.cols;
            var o2 = c;
            for (var i = 0; i < this.cols; i++) {
              v += this.elems[o1] * that.elems[o2];
              o1++;
              o2 += that.cols;
            }
            row.push(v);
          }
          rows.push(row);
        }
        return new (Function.prototype.bind.apply(Matrix, [null].concat(rows)))();
      }
    }, {
      key: 'toString',
      value: function toString() {
        return pack(this.elems, this.cols).map(function (row) {
          return row.join(', ');
        }).join('\n');
      }
    }], [{
      key: 'identity',
      value: function identity(size) {
        var zeros = Array(size).fill(0);
        var rows = [];
        for (var i = 0; i < size; i++) {
          var row = zeros.slice();
          row[i] = 1;
          rows.push(row);
        }
        return new (Function.prototype.bind.apply(Matrix, [null].concat(rows)))();
      }
    }]);
    return Matrix;
  }();

  function translationMatrix(tx, ty) {
    return new Matrix([1, 0, tx], [0, 1, ty], [0, 0, 1]);
  }

  function scalingMatrix(sx, sy) {
    return new Matrix([sx, 0, 0], [0, sy, 0], [0, 0, 1]);
  }

  var Transform = function () {
    function Transform() {
      var matrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Matrix.identity(3);
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Transform);

      readonly(this, 'matrix', matrix);
      readonly(this, 'tx', values.tx || 0);
      readonly(this, 'ty', values.ty || 0);
      readonly(this, 'angle', values.angle || 0);
      readonly(this, 'sx', values.sx || 1);
      readonly(this, 'sy', values.sy || 1);
    }

    createClass(Transform, [{
      key: 'transform',
      value: function transform(that) {
        return new Transform(this.matrix.product(that.matrix), {
          tx: this.tx + that.tx,
          ty: this.ty + that.ty,
          angle: this.angle + that.angle,
          sx: this.sx * that.sx,
          sy: this.sy * that.sy
        });
      }
    }, {
      key: 'translate',
      value: function translate(tx) {
        var ty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tx;

        var matrix = this.matrix.product(translationMatrix(tx, ty));
        return new Transform(matrix, {
          tx: this.tx + tx,
          ty: this.ty + ty,
          angle: this.angle,
          sx: this.sx,
          sy: this.sy
        });
      }
    }, {
      key: 'scale',
      value: function scale(sx) {
        var sy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sx;

        var matrix = this.matrix.product(scalingMatrix(sx, sy));
        return new Transform(matrix, {
          tx: this.tx,
          ty: this.ty,
          angle: this.angle,
          sx: this.sx * sx,
          sy: this.sy * sy
        });
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.matrix.toString();
      }
    }]);
    return Transform;
  }();

  function pixelRatio(context) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  }

  var Canvas = function (_Component) {
    inherits(Canvas, _Component);

    function Canvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Canvas);

      var _this = possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, Canvas._initOptions(options)));

      _this._context = _this._element.getContext('2d');
      _this._pixelRatio = pixelRatio(_this._context);
      return _this;
    }

    createClass(Canvas, [{
      key: '_onSizeChanged',
      value: function _onSizeChanged(size) {
        get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), '_onSizeChanged', this).call(this, size);
        var width = size.width,
            height = size.height;

        this._element.width = width * this._pixelRatio;
        this._element.height = height * this._pixelRatio;
      }
    }, {
      key: '_onStaged',
      value: function _onStaged() {
        this._draw();
      }
    }, {
      key: 'transform',
      value: function transform(_transform) {
        this._context.resetTransform();

        var _scale$transform$matr = slicedToArray(new Transform().scale(this._pixelRatio).transform(_transform).matrix.elems, 6),
            sx = _scale$transform$matr[0],
            kx = _scale$transform$matr[1],
            tx = _scale$transform$matr[2],
            ky = _scale$transform$matr[3],
            sy = _scale$transform$matr[4],
            ty = _scale$transform$matr[5];

        this._context.setTransform(sx, ky, kx, sy, tx, ty);
        this._draw();
      }
    }, {
      key: '_draw',
      value: function _draw() {}
    }], [{
      key: '_initOptions',
      value: function _initOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return Object.assign({}, options, {
          element: document.createElement('canvas')
        });
      }
    }]);
    return Canvas;
  }(Component);

  var Pegboard = function (_Canvas) {
    inherits(Pegboard, _Canvas);

    function Pegboard() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Pegboard);

      var _this = possibleConstructorReturn(this, (Pegboard.__proto__ || Object.getPrototypeOf(Pegboard)).call(this, options));

      _this._pegboard = {
        spacing: options.spacing || 10,
        padding: options.padding || 10,
        pegsize: options.pegsize || 4
      };
      return _this;
    }

    createClass(Pegboard, [{
      key: '_draw',
      value: function _draw() {
        var _this2 = this;

        var ctx = this._context;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        this._drawBase();
        this._pegs().forEach(function (peg) {
          return _this2._drawPeg(peg);
        });
      }
    }, {
      key: '_drawBase',
      value: function _drawBase() {}
    }, {
      key: '_drawPeg',
      value: function _drawPeg(peg) {
        var _pegboard2canvas = this.pegboard2canvas(peg),
            x = _pegboard2canvas.x,
            y = _pegboard2canvas.y;

        var pegsize = this._pegboard.pegsize;

        var ctx = this._context;
        ctx.beginPath();
        ctx.arc(x, y, pegsize / 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }, {
      key: 'pegboard2canvas',
      value: function pegboard2canvas() {}
    }]);
    return Pegboard;
  }(Canvas);

  var SquarePegboard = function (_Pegboard) {
    inherits(SquarePegboard, _Pegboard);

    function SquarePegboard() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, SquarePegboard);

      var _this = possibleConstructorReturn(this, (SquarePegboard.__proto__ || Object.getPrototypeOf(SquarePegboard)).call(this, options));

      _this._pegboard.length = length;
      return _this;
    }

    createClass(SquarePegboard, [{
      key: '_pegs',
      value: function _pegs() {
        var length = this._pegboard.length;

        var p0 = -Math.floor(length / 2);
        var pegs = [];
        for (var y = 0; y < length; y++) {
          for (var x = 0; x < length; x++) {
            pegs.push(new Point(p0 + x, p0 + y));
          }
        }
        return pegs;
      }
    }, {
      key: '_drawBase',
      value: function _drawBase() {
        var ctx = this._context;
        var _pegboard = this._pegboard,
            length = _pegboard.length,
            padding = _pegboard.padding,
            spacing = _pegboard.spacing;

        var len = length * spacing + padding;
        var p0 = -len / 2;

        ctx.beginPath();
        ctx.rect(p0, p0, len, len);
        ctx.fill();
        ctx.stroke();
      }
    }, {
      key: 'pegboard2canvas',
      value: function pegboard2canvas(peg) {
        var spacing = this._pegboard.spacing;

        return peg.scaleBy(spacing);
      }
    }]);
    return SquarePegboard;
  }(Pegboard);

  var App = function (_Component) {
    inherits(App, _Component);

    function App(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, App);
      return possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, App._initOptions(id, options)));
    }

    createClass(App, [{
      key: 'run',
      value: function run() {
        var _size = this.size(),
            width = _size.width,
            height = _size.height;

        var transform = new Transform().translate(width / 2, height / 2);
        var pegboard = new SquarePegboard(57);
        pegboard.size(this.size()).transform(transform);
        this.add(pegboard);
      }
    }], [{
      key: '_initOptions',
      value: function _initOptions(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var element = document.getElementById(id);

        var _element$getBoundingC = element.getBoundingClientRect(),
            left = _element$getBoundingC.left,
            top = _element$getBoundingC.top,
            width = _element$getBoundingC.width,
            height = _element$getBoundingC.height;

        return Object.assign({}, options, {
          element: element,
          position: new Point(left, top),
          size: new Size(width, height),
          isStaged: true
        });
      }
    }]);
    return App;
  }(Component);

  var main = {
    App: App,
    Component: Component
  };

  return main;

}());
