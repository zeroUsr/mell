import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
Vue.use(toast)

// fastclick 减少移动端点击延迟的 300ms
// 1.安装 fastclick npm install fastclick --save
// 2.导入 fastclick
import FastClick from 'fastclick'
// 3.调用其内部函数
FastClick.attach(document.body)

// Vue-lazyload 的使用
// 1.安装 npm install vue-lazyload --save
// 2.导入
import VueLazyload from 'vue-lazyload'
// 3.使用 Vue.use() 安装 可传入一个对象
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/404.png'),
})
// 4.将 img 的 src 修改为 v-lazy

Vue.config.productionTip = false


// 事件总线的使设置 （使 Vue 的原型中的一个对象 $bus 为 Vue 的实例） 
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
