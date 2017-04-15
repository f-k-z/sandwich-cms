import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/back/home/Home'
import PageEdit from '@/components/back/page-edit/PageEdit'

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
      path: '/page/edit/:page_id',
      name: 'PageEdit',
      component: PageEdit
    }
  ]
})
