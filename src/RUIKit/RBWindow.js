import RBView from './RBView';
import RBClass from './RBClass';

export default function () {
  return RBClass.inherit({
    initIn(window, htmlElement) {
      window.addEventListener('resize', this.resize, false);
      this._id = "rbwindow";
      this._ctx = htmlElement;
      this.frame = {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
      this._frameInWindow = this.frame;
      this.draw()
    },
    resize() {
      console.log(this);
      // this.draw();
    }
  }, new RBView);
};