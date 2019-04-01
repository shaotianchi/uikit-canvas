<template>
  <div class="home" id="window">
    <!-- <canvas id="tutorial" width="200" height="200"></canvas> -->
    <!-- <item id="item-1"></item> -->
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import RBView from '../RUIKit/RBView'
import RBWindow from '../RUIKit/RBWindow'
import RBLabel from '../RUIKit/RBLabel'
import RBImageView from '../RUIKit/RBImageView'

export default {
  name: 'home',
  components: {
    Item
  },
  mounted () {
    // window.addEventListener('resize', this.resize, false);
    this.draw();
  },
  methods: {
    // resize () {
    //   var canvas = document.getElementById('tutorial');
    //   // var ctx = canvas.getContext('2d');
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // },
    draw () {
      // var item = document.getElementById('item-1').outerHTML;
      // var data = 
      // `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      //   <foreignObject width="100%" height="100%">
      //     ${item}
      //   </foreignObject>
      // </svg>`;
      // var canvas = document.getElementById('tutorial');
      // var ctx = canvas.getContext('2d');

      let _window = new RBWindow;
      _window.backgroundColor = 'green'
      _window.initIn(window, document.getElementById('window'));

      let view = new RBView;
      view.initWithFrame((_window.frame.width - 375) / 2, (_window.frame.height - 667) / 2, 375, 667);
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
      navigation.initWithFrame(0, 0, 375, 64);
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

