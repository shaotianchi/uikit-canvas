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
        if (this.contentMode === RBViewContentMode.ScaleToFill) {
          ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height);
        } else if (this.contentMode === RBViewContentMode.ScaleAspectFit) {
          ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height);
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