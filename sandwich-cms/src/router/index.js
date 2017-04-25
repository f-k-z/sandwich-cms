import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/back/home/Home'
import PageEdit from '@/components/back/page-edit/PageEdit'
import PageView from '@/components/front/PageView'

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
    },
    {
      path: '/:page_slug',
      name: 'PageView',
      component: PageView
    }
  ]
})
