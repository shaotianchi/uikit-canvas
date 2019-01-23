import RBResponder from './RBResponder';
import RBClass from './RBClass';

export default function () {
  return RBClass.inherit({
    _id: null,
    _ctx: null,
    _zindex: 0,
    backgroundColor: 'white',
    frame: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    subViews: [],
    superView: null,
    userInteraction: true,
    _frameInWindow: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    origin() {
      return {
        x: this.frame.x,
        y: this.frame.y
      };
    },
    size() {
      return {
        width: this.frame.width,
        height: this.frame.height
      };
    },
    _super: null,
    initWithFrame(x, y, width, height) {
      this.frame = {
        x,
        y,
        width,
        height
      };
      this._frameInWindow = this.frame;
      return this;
    },
    addSubView(view) {
      this.subViews.push(view);
      view.superView = this;
      view.calculateFrameInWindow(this._frameInWindow);
      view._ctx = this._ctx;
      view._id = this._id + '.' + this.subViews.indexOf(view);
      view._zindex = this._zindex + 1;
      this.draw();
    },
    removeFromSuperView() {
      this.superView.removeSubView(this);
      this.superView = null;
      const node = document.getElementById(this._id);
      node.parentNode.removeChild(node);
    },
    removeSubView(subView) {
      const index = this.subViews.indexOf(subView);
      if (index < 0) { return; }
      this.subViews.splice(index, 1);
      this.subViews.forEach(view => {
        view._id = this._id + '.' + this.subViews.indexOf(view);
      });
      this.draw();
    },
    draw() {
      if (!this._ctx) { return; }

      let canvas = document.getElementById(this._id);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = this._id;
        this._ctx.appendChild(canvas);
      }
      const ctx = canvas.getContext('2d');

      // canvas.style.width = String(this._frameInWindow.width) + 'px';
      // canvas.style.height = String(this._frameInWindow.height) + 'px';
      // canvas.style.left = String(this._frameInWindow.x) + 'px';
      // canvas.style.top = String(this._frameInWindow.y) + 'px';
      // canvas.style.zIndex = String(this._zindex);
      // canvas.style.position = 'absolute';
      canvas.style = `left: ${this._frameInWindow.x}px; top: ${this._frameInWindow.y}px; z-index: ${this._zindex}; position: absolute`;
      canvas.width = this._frameInWindow.width;
      canvas.height = this._frameInWindow.height;

      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, this._frameInWindow.width, this._frameInWindow.height);
      this.subViews.forEach((view) => {
        view.draw();
      });
    },
    calculateFrameInWindow(superFrame) {
      this._frameInWindow = {
        x: superFrame.x + this.frame.x,
        y: superFrame.y + this.frame.y,
        width: this.frame.width,
        height: this.frame.height
      }
    },
  }, new RBResponder);
};