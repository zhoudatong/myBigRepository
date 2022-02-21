import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './i18n'
// import '@/validate'
import '@/style/index.css'
import '@/style/simple-common.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI,i18n)
Vue.config.productionTip = false

export const app = new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
