import RBView from './RBView';
import RBClass from './RBClass';

// TODO: 换行
export default function () {
  return RBClass.inherit({
    text: '',
    font: 'Sans-Serif',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    align: 'left',
    lines: 1,
    __textHeight: -1,
    beforeDrawCtx() {
      this.frame.height = this.getTextHeight();
      this.__frameInWindow.height = this.frame.height;
    },
    draw(ctx) {
      if (!this.text || this.text.length <= 0) { return; }

      ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.font}`;
      ctx.fillStyle = this.color;
      ctx.textBaseline = 'middle'
      const textWidth = ctx.measureText(this.text).width;
      let x = 0;
      if (this.align === 'left') {
        x = 0;
      } else if (this.align === 'center') {
        x = Math.max((this.frame.width - textWidth) / 2, 0)
      } else if (this.align === 'right') {
        x = Math.max((this.frame.width - textWidth), 0)
      }
      ctx.fillText(this.text, x, this.getTextHeight() / 2);
    },
    getTextHeight () {
      if (this.__textHeight === -1) { 
        const div = document.createElement("div");
        div.innerHTML = this.text;
        div.style.position = 'absolute';
        div.style.top  = '-1000000px';
        div.style.left = '-1000000px';
        div.style.fontFamily = this.font;
        div.style.fontWeight = this.fontWeight;
        div.style.fontSize = this.fontSize + 'px'; // or 'px'
        document.body.appendChild(div);
        const size = div.clientHeight;
        document.body.removeChild(div);
        this.__textHeight = size; 
      }
      return this.__textHeight;
    }
  }, new RBView);
};