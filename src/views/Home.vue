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
      view.initWithFrame(0, 0, 100, 100);
      view.backgroundColor = 'red';
      _window.addSubView(view);

      let subview1 = new RBView;
      subview1.initWithFrame(10, 10, 20, 20);
      view.addSubView(subview1);

      let subview2 = new RBView;
      subview2.initWithFrame(50, 50, 40, 40);
      view.addSubView(subview2);

      let subview3 = new RBView;
      subview3.initWithFrame(10, 10, 10, 10);
      subview3.backgroundColor = 'green';
      subview2.addSubView(subview3);
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

