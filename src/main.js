import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/flex.css'

// import RBView from './RUIKit/RBView';

// const view = new RBView;

// console.log(view.touchBegan);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
