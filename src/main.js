import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//使用图片懒加载插件
Vue.use(VueLazyLoad)
//使用自定义的toast插件
Vue.use(toast)

//添加事件总线对象
Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
