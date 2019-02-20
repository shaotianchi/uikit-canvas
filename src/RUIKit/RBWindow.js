import RBView from './RBView';
import RBClass from './RBClass';

export default function () {
  return RBClass.inherit({
    __inTouch: false,
    initIn(window, htmlElement) {
      window.addEventListener('resize', this.resize.bind(this), false);
      this.__id = "rbwindow";
      htmlElement.onmousedown = this.touchBegan.bind(this);
      htmlElement.onmouseup = this.touchEnd.bind(this);
      htmlElement.onmousemove = this.touchMoved.bind(this);
      this.__ctx = htmlElement;
      this.frame = {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
      this.__frameInWindow = this.frame;
      this.showing = true;
      this.__draw();
    },
    resize() {
      this.__draw();
    },
    // 暂时 window 不处理点击事件 由 window 分发
    touchBegan(e) {
      this._inTouch = true;
      const hitView = this.hitTest({x: e.x, y: e.y});
      this.handleEvent(e, hitView);
    },
    touchMoved(e) {
      if (!this.__inTouch) { return; }
    },
    touchEnd(e) {
      this.__inTouch = false;
    },
    handleEvent(e, view) {
      if (!view) { return; }
      if (view.userInteraction) {
        view.touchBegan(e);
      } else {
        this.handleEvent(e, view.nextResponse)
      }
    }
  }, new RBView);
};