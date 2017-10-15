import Vue from 'vue'
import Router from 'vue-router'

// components
import HomeBack from '@/components/back/home/HomeBack'
import PageList from '@/components/front/PageList'
import PageEdit from '@/components/back/page-edit/PageEdit'
import DynamicPage from '@/components/front/DynamicPage'
import PageView from '@/components/front/PageView'
import Login from '@/components/back/login/Login'
import Front from '@/components/front/Front'

// router
Vue.use(Router)

//see nested views https://router.vuejs.org/en/essentials/nested-routes.html

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Front,
      children : [
        { 
          path: '', 
          component: PageView,
          props : { slug: 'home' },
        },
        {
          path: '/work',
          component: PageList,
        },
        {
          path: '/work/:slug',
          component: DynamicPage
        },
        { 
          path: '/about', 
          component: PageView,
          props : { slug: 'about' },
        },
        { 
          path: '/contact', 
          component: PageView,
          props : { slug: 'contact' },
        },
      ]
    },
    {
      path: '/admin',
      component: HomeBack
    },
    {
      path: '/admin/edit/:page_id',
      component: PageEdit
    },
    
    {
      path: '/login',
      component: Login
    }
  ],
})
