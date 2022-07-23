import Vue from 'vue'
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false


Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(BaiduMap, {
  ak: 'vtvimjG0hUeDlAuX7VSv2OthEGvr78cg'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
