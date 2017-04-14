// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(VueFire)

//custom filter for date format
Vue.filter('timestampToDate', function (value) {
  return moment(value, "x").format("DD/MM/YYYY - HH:mm")
})

/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
