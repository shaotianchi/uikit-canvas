<template>
  <div class="home" id="window">
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import RBView from '../RUIKit/RBView'
import RBWindow from '../RUIKit/RBWindow'
import RBLabel from '../RUIKit/RBLabel'
import RBImageView from '../RUIKit/RBImageView'
import { RBViewContentMode } from '../RUIKit/RBView'

export default {
  name: 'home',
  components: {
    Item
  },
  mounted () {
    this.draw();
  },
  methods: {
    draw () {
      let _window = new RBWindow;
      _window.backgroundColor = 'green'
      _window.initIn(window, document.getElementById('window'));

      let background = new RBImageView;
      background.initWithFrame(0, 0, 477, 960);
      background.src = require('../assets/8p.png');
      _window.addSubView(background);

      let view = new RBView;
      view.initWithFrame(32, 110, 414, 736);
      view.backgroundColor = 'white';
      _window.addSubView(view);
      // view.backgroundColor = 'red';
      // view.userInteraction = true;
      // view.touchBegan = (e) => {
      //   console.log('view handle touch began', e);
      // }
      // view.touchMove = (e) => {

      // }
      // view.touchEnd = (e) => {
        
      // }
      
      let navigation = new RBView;
      navigation.initWithFrame(0, 0, 414, 64);
      navigation.backgroundColor = 'black'
      view.addSubView(navigation);

      let navigationTitle = new RBLabel;
      // navigationTitle.backgroundColor = 'red';
      navigationTitle.initWithFrame(0, 20, 375, 44);
      navigationTitle.text = "Home";
      navigationTitle.color = 'white';
      navigationTitle.fontSize = 20
      navigationTitle.align = 'center';
      navigation.addSubView(navigationTitle);

      let imageView = new RBImageView;
      imageView.initWithFrame(0, 90, 100, 100);
      imageView.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
      imageView.borderWidth = 2;
      imageView.borderColor = 'red';
      imageView.contentMode = RBViewContentMode.ScaleAspectFit;
      view.addSubView(imageView);
    }
  }
}
</script>

<style scoped>

.home {
  /* flex: 1; */
  width: 1000px;
  height: 800px;
}

#tutorial {
  position: absolute;
  display: block;
}
</style>

