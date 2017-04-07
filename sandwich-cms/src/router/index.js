import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/Home'

// router
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
