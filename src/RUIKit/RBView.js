import RBResponder from './RBResponder';
import RBClass from './RBClass';

const RBViewContentMode = {
  ScaleToFill: 'ScaleToFill',
  ScaleAspectFit: 'ScaleAspectFit',      // contents scaled to fit with fixed aspect. remainder is transparent
  ScaleAspectFill: 'ScaleAspectFill',     // contents scaled to fill with fixed aspect. some portion of content may be clipped.
  Redraw: 'Redraw',              // redraw on bounds change (calls -setNeedsDisplay)
  Center: 'Center',              // contents remain same size. positioned adjusted.
  Top: 'Top',
  Bottom: 'Bottom',
  Left: 'Left',
  Right: 'Right',
  TopLeft: 'TopLeft',
  TopRight: 'TopRight',
  BottomLeft: 'BottomLeft',
  BottomRight: 'BottomRight',
}

export {
  RBViewContentMode
}

export default function () {
  return RBClass.inherit({
    __id: null,
    __ctx: null,
    __zindex: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: [0, 0],
    shadowRadius: 0,
    backgroundColor: 'transparent',
    frame: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    __super: null,
    subViews: [],
    superView: null,
    userInteraction: false,
    __frameInWindow: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    showing: false,
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
    initWithFrame(x, y, width, height) {
      this.frame = {
        x,
        y,
        width,
        height
      };
      this.__frameInWindow = this.frame;
      return this;
    },
    addSubView(view) {
      this.subViews.push(view);
      view.superView = this;
      view.nextResponse = this;
      if (this.showing) {
        view.__draw();
      }
    },
    willShowInSuperView() {
      if (this.showing) { return };
      this.calculateFrameInWindow();
      this.__zindex = this.superView.__zindex + 1;
      this.__id = this.superView.__id + '.' + this.superView.subViews.indexOf(this);
      this.__ctx = this.superView.__ctx;
    },
    removeFromSuperView() {
      this.superView.removeSubView(this);
      this.superView = null;
      const node = document.getElementById(this.__id);
      node.parentNode.removeChild(node);
      this.showing = false;
    },
    removeSubView(subView) {
      const index = this.subViews.indexOf(subView);
      if (index < 0) { return; }
      this.subViews.splice(index, 1);
      this.subViews.forEach(view => {
        view.__id = this.__id + '.' + this.subViews.indexOf(view);
      });
      this.__draw();
    },
    __draw() {
      this.willShowInSuperView();
      if (!this.__ctx) { return; }

      let canvas = document.getElementById(this.__id);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = this.__id;
        this.__ctx.appendChild(canvas);
      }
      this.beforeDrawCtx();

      canvas.style = `left: ${this.__frameInWindow.x}px; top: ${this.__frameInWindow.y}px; z-index: ${this.__zindex}; position: absolute`;
      canvas.width = this.__frameInWindow.width;
      canvas.height = this.__frameInWindow.height;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, this.__frameInWindow.width, this.__frameInWindow.height);

      ctx.lineWidth = this.borderWidth;
      ctx.strokeStyle = this.borderColor;
      ctx.strokeRect(0, 0, this.frame.width, this.frame.height);//for white background

      this.draw(ctx);
      this.subViews.forEach((view) => {
        view.__draw();
      });
      this.showing = true;
    },
    draw(ctx) {

    },
    beforeDrawCtx() {
      
    },
    calculateFrameInWindow() {
      if (!this.superView) {
        this.__frameInWindow = this.frame;
      } else {
        this.__frameInWindow = {
          x: this.superView.__frameInWindow.x + this.frame.x,
          y: this.superView.__frameInWindow.y + this.frame.y,
          width: this.frame.width,
          height: this.frame.height
        }
      }
    },
    hitTest(point) {
      const inFrame = (point.x >= this.__frameInWindow.x && point.x <= this.__frameInWindow.x + this.__frameInWindow.width && point.y >= this.__frameInWindow.y && point.y <= this.__frameInWindow.y + this.__frameInWindow.height);
      if (!inFrame) { return null; }
      let hitView = null;
      this.subViews.some((view) => {
        hitView = view.hitTest(point);
        if (hitView) {
          return true;
        }
      });
      return hitView || this;
    },
    __redrawProps () {
      return ['backgroundColor', 'frame', 'borderWidth', 'borderColor', 'shadowColor', 'shadowOpacity', 'shadowOffset', 'shadowRadius']
    },
    willSet(prop, value) {
      if (prop === 'frame') {
        if (this.superView) {
          this.calculateFrameInWindow(this.superView.__frameInWindow);
        } else {
          this.__frameInWindow = value;
        }
      }
      if (this.__redrawProps().includes(prop) && this.showing) {
        this.__draw();
      }
    }
  }, new RBResponder);
}