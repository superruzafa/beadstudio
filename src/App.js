import Component from './Component';
import Point from './Point';
import Size from './Size';
import SquarePegboard from './SquarePegboard';
import Transform from './Transform';

export default class App extends Component {
  constructor(id, options = {}) {
    super(App._initOptions(id, options));
  }

  static _initOptions(id, options = {}) {
    const element = document.getElementById(id);
    const { left, top, width, height } = element.getBoundingClientRect();
    return Object.assign({}, options, {
      element,
      position: new Point(left, top),
      size: new Size(width, height),
      isStaged: true
    });
  }

  run() {
    const { width, height } = this.size();
    const transform = new Transform()
      .translate(width / 2, height / 2);
    const pegboard = new SquarePegboard(57);
    pegboard
      .size(this.size())
      .transform(transform);
    this.add(pegboard);
  }
}
