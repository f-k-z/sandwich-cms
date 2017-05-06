import Vue from 'vue'
import Router from 'vue-router'

// components
import HomeBack from '@/components/back/home/HomeBack'
import PageEdit from '@/components/back/page-edit/PageEdit'
import PageView from '@/components/front/PageView'

// router
Vue.use(Router)

//see nested views https://router.vuejs.org/en/essentials/nested-routes.html

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeBack',
      component: HomeBack
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
