import Vue from 'vue'
import ElementUI from 'element-ui'
import '../static/css/reset.css'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from '../config/routes.js'

Vue.use(ElementUI)

require('./mock.js')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})