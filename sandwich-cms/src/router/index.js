import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/Home'
import PageEdit from '@/components/PageEdit'

// router
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page/edit/:id',
      name: 'PageEdit',
      component: PageEdit
    }
  ]
})
