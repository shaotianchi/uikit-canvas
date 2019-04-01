import RBView from './RBView';
import RBClass from './RBClass';

export default function () {
  return RBClass.inherit({
    src: null,
    contentMode: 'ScaleToFill',
    draw(ctx) {
      if (!this.src || this.src.length <= 0) { return; }
      const imgId = 'rb-img-load-' + this.__id;
      const img = document.createElement("img");
      img.id = imgId
      img.src = this.src;
      img.style.position = 'absolute';
      img.style.top  = '-10000000px';
      img.style.left = '-10000000px';
      img.addEventListener("load", function () {
        const image = document.getElementById(imgId);
        ctx.drawImage(image, 0, 0);
        document.body.removeChild(img);
      });
      document.body.appendChild(img);
    },
    __redrawProps () {
      let redrawProps = this.__super.__redrawProps || [];
      redrawProps.push('src');
      return redrawProps;
    },
  }, new RBView);
};