import RBView from './RBView';
import RBClass from './RBClass';
import {RBViewContentMode} from './RBView';

export default function () {
  return RBClass.inherit({
    src: null,
    contentMode: RBViewContentMode.ScaleToFill,
    draw(ctx) {
      if (!this.src || this.src.length <= 0) { return; }
      var img = new Image;
      img.onload = () => {
        if (this.contentMode === RBViewContentMode.ScaleToFill || this.contentMode === RBViewContentMode.Redraw) {
          ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height);
        } else if (this.contentMode === RBViewContentMode.ScaleAspectFit) {
          if (img.width / img.height <= this.frame.width / this.frame.height) {
            const width = this.frame.height * img.width / img.height;
            ctx.drawImage(img, (this.frame.width - width) / 2, 0, width, this.frame.height);
          } else {
            const height = this.frame.width * img.height / img.width;
            ctx.drawImage(img, 0, (this.frame.height - height) / 2, this.frame.width, height);
          }
        } else if (this.contentMode === RBViewContentMode.ScaleAspectFill) {
          if (img.width / img.height >= this.frame.width / this.frame.height) {
            const width = img.width * (this.frame.height / img.height);
            ctx.drawImage(img, (this.frame.width - width) / 2, 0, width, this.frame.height);
          } else {
            const height = img.height * (this.frame.width / img.width);
            ctx.drawImage(img, 0, (this.frame.height - height) / 2, this.frame.width, height);
          }
        } else if (this.contentMode === RBViewContentMode.Center) {
          ctx.drawImage(img, (this.frame.width - img.width) / 2, (this.frame.height - img.height) / 2, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.Top) {
          ctx.drawImage(img, (this.frame.width - img.width) / 2, 0, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.Bottom) {
          ctx.drawImage(img, (this.frame.width - img.width) / 2, this.frame.height - img.height, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.Left) {
          ctx.drawImage(img, 0, (this.frame.height - img.height) / 2, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.Right) {
          ctx.drawImage(img, this.frame.width - img.width, (this.frame.height - img.height) / 2, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.TopLeft) {
          ctx.drawImage(img, 0, 0, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.TopRight) {
          ctx.drawImage(img, this.frame.width - img.width, 0, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.BottomLeft) {
          ctx.drawImage(img, 0, this.frame.height - img.height, img.width, img.height);
        } else if (this.contentMode === RBViewContentMode.BottomRight) {
          ctx.drawImage(img, this.frame.width - img.width, this.frame.height - img.height, img.width, img.height);
        } else {
          throw '不支持的 content mode';
        }
      };
      img.src = this.src;
    },
    __redrawProps () {
      let redrawProps = this.__super.__redrawProps || [];
      redrawProps.push('src');
      return redrawProps;
    },
  }, new RBView);
};